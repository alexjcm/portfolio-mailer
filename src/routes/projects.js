import express from 'express';
import * as projectsController from '../controllers/projects';
import {
  projectBodyValidation,
  idProjectBodyValidation,
} from '../middlewares/projectBodyValidation';

const router = express.Router();

router.get('/projects/', projectsController.getAllActiveProjects);
router.get('/projects/:id', projectsController.getProjectById);
router.post('/projects/create', projectBodyValidation, projectsController.createProject);
router.post(
  '/projects/update',
  [projectBodyValidation, idProjectBodyValidation],
  projectsController.updateProject
);

export default router;
