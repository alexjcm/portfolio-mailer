import { Router } from 'express';
import * as projectsController from '../controllers/projects';
import {
  projectBodyValidation,
  idProjectBodyValidation,
} from '../middlewares/projectBodyValidation';
import isAuthenticated from '../middlewares/isAuthenticated';

const router = Router();

router.get('/projects/incrementVisit', projectsController.incrementVisit);

router.get('/projects/', projectsController.getAllActiveProjects);
router.get('/projects/:id', projectsController.getProjectById);
router.post(
  '/projects/create',
  [isAuthenticated, projectBodyValidation],
  projectsController.createProject
);
router.post(
  '/projects/update',
  [isAuthenticated, projectBodyValidation, idProjectBodyValidation],
  projectsController.updateProject
);


export default router;
