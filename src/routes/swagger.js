import { Router } from 'express';
import swaggerDocument from '../../swagger.json';
import swaggerUi from 'swagger-ui-express';

const router = Router();

// TODO: Temporarily deactivate because not yet used

// router.use('/api-docs', swaggerUi.serve);
// router.get('/api-docs', swaggerUi.setup(swaggerDocument));

export default router;
