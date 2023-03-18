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

export const createProject = (req, res, next) => {
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
      console.log('err:', err);
      res.status(405).json('Error has occured');
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
