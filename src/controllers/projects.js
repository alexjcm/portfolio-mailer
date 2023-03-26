import db from '../database';

/**
 * Get all active projects
 */
export const getAllActiveProjects = (req, res, next) => {
  db.models.project
    .findAll({ where: { status: true } })
    .then((projt) => {
      res.status(200).json(projt);
    })
    .catch(function (err) {
      console.error('error:', err);
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
      console.error('err:', err);
      res.status(405).json('Error has occured');
    });
};

export const createProject = (req, res, next) => {
  db.models.project
    .create(req.body)
    .then((projt) => {
      res.status(200).json(projt);
    })
    .catch((err) => {
      console.log('err:', err);
      res.status(405).json('Error creating project');
    });
};

export const updateProject = (req, res) => {
  db.models.project
    .update(req.body, {
      where: { id: req.body.id },
    })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: 'Project was updated successfully.',
        });
      } else {
        res.status(400).send({
          message: `Cannot update project with id=${req.body.id} was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating project with id=${req.body.id}`,
      });
    });
};
