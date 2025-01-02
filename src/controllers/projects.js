import db from '../database';
import logger from '../logger/logger';
import { client } from '../config/redis';
import { cacheConfig } from '../utils/constants';

export const getAllActiveProjects = async (req, res, next) => {
  try {
    const cachedData = await getFromCache(cacheConfig.PROJECTS_CACHE_KEY);
    if (cachedData) {
      return res.status(200).json(cachedData);
    }

    const projects = await fetchProjectsFromDB();

    await saveToCache(cacheConfig.PROJECTS_CACHE_KEY, projects);

    res.status(200).json(projects);
  } catch (error) {
    logger.error(error, 'Error en getAllActiveProjects');
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Obtiene datos desde Redis usando una clave específica.
 * @param {string} key - Clave de Redis
 * @returns {Promise<Object|null>} - Datos parseados o null si no existe
 */
const getFromCache = async (key) => {
  const data = await client.get(key);
  if (data) {
    return JSON.parse(data);
  }
  logger.warn(`Data not found in cache for key: ${key}`);
  return null;
  
};

/**
 * Almacena datos en Redis con una clave y tiempo de vida (TTL).
 * @param {string} key - Clave de Redis
 * @param {Object} value - Datos a almacenar
 * @param {number} ttl - Tiempo de vida en segundos
 * @returns {Promise<void>}
 */
const saveToCache = async (key, value, ttl) => {
  try {
    await client.set(key, JSON.stringify(value), { EX: ttl ?? cacheConfig.PROJECTS_CACHE_TTL });
  } catch (err) {
    logger.error(err, `Error to save data in cache with key: ${key}`);
    throw err;
  }
};

export const invalidateCache = async (key) => {
  try {
    const result = await client.del(key);
    if (result === 1) {
      logger.info(`Cache invalidated for key: ${key}`);
    } else {
      logger.error(`No cache found for key: ${key}`);
    }
  } catch (err) {
    logger.error(`Error invalidating cache for key: ${key}`, err);
    throw err;
  }
};

const fetchProjectsFromDB = async () => {
  return await db.models.project.findAll({
    attributes: ['id', 'name', 'description', 'projectLink', 'imageProjectLink'],
    where: { status: true },
  });
};

export const getProjectById = (req, res, next) => {
  const { id: projectId } = req.params;

  db.models.project
    .findOne({
      where: { id: projectId },
    })
    .then((projt) => {
      res.status(200).json(projt);
    })
    .catch((err) => {
      logger.error(err, 'err:');
      res.status(405).json('Error has occured');
    });
};

export const createProject = async (req, res, next) => {
  try {
    const projt = await db.models.project.create(req.body);

    await invalidateCache(cacheConfig.PROJECTS_CACHE_KEY);
    // await saveToCache(`project:${projt.id}`, projt);

    res.status(200).json(projt);
  } catch (err) {
    logger.error(err, 'Error creating project:');
    res.status(405).json('Error creating project');
  }
};

export const updateProject = async (req, res) => {
  try {
    const [result] = await db.models.project.update(req.body, {
      where: { id: req.body.id },
    });
    if (result === 1) {
      const updatedProject = await db.models.project.findByPk(req.body.id);
      if (updatedProject) {
        await invalidateCache(cacheConfig.PROJECTS_CACHE_KEY);
        // await saveToCache(`project:${updatedProject.id}`, updatedProject);
      }
      res.send({
        message: 'Project was updated successfully.',
      });
    } else {
      res.status(400).send({
        message: `Cannot update project with id=${req.body.id}; project was not found!`,
      });
    }
  } catch (err) {
    logger.error(err, 'Error updating project:');
    res.status(500).send({
      message: `Error updating project with id=${req.body.id}`,
    });
  }
};

export const incrementVisit = (req, res) => {
  db.models.visit
    .findOrCreate({
      where: { },
      defaults: { counter: 1 },
    })
    .then(([visit, created]) => {
      if (!created) {
        visit
        .increment('counter')
        .then(() => visit.save());
        res.send({
          message: 'Visit was updated successfully.',
          data: visit
        });
      } else {
        res.send({
          message: 'Visit was created successfully.',
          data: visit
        });
      }
    })
    .catch((error) => {
      logger.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};
