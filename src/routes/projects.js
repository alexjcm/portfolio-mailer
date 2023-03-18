import express from 'express';
import * as projectsController from '../controllers/projects';

const router = express.Router();

router.get('/projects', projectsController.getAllActiveProjects);
router.post('/projects', projectsController.createProject);
router.get('/projectById/:id', projectsController.getProjectById);

export default router;
