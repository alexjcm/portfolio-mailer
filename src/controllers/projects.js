import myModels from '../models';

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
export const getAllActiveProjects = (req, res, next) => {
  myModels.models.project
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
};

export const createProject = (req, res, next) => {
  myModels.models.project
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
  myModels.models.project
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
          message: `Cannot update project with id=${id} was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating project with id=${id}`,
      });
    });
};
