import express from 'express';
import sqlite3 from 'sqlite3';
import myModels from '../models';

const router = express.Router();

//Sync Database
myModels
  .sync()
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.log('Error connecting to database: ', err);
  });

/**
 * Get all active projects
 */
router.get('/projects', (req, res, next) => {
  try {
    myModels.models.project
      .findAll({ where: { status: true } })
      .then((projt) => {
        res.status(200).json(projt);
      })
      .catch(function (err) {
        console.error('error:', err);
      });
  } catch (error) {
    return next(error);
  }
});

router.post('/projects', (req, res, next) => {
  try {
    myModels.models.project
      .create({
        name: req.body.name,
        description: req.body.description,
        link: req.body.link,
        status: req.body.status,
      })
      .then((projt) => {
        res.status(200).json(projt);
      })
      .catch((err) => {
        res.status(405).json('Error has occured');
      });
  } catch (error) {
    console.log('errorD:', error);
    return next(error);
  }
});

/**
 * GET /projectById/:id
 */
router.get('/projectById/:id', (req, res, next) => {
  try {
    const { id: projectId } = req.params;

    myModels.models.project
      .findOne({
        where: { id: projectId },
      })
      .then((projt) => {
        res.status(200).json(projt);
      })
      .catch((err) => {
        console.error('err:', err);
        res.status(405).json('Error has occured');
      });
  } catch (error) {
    console.log('errorD:', error);
    return next(error);
  }
});

export default router;
