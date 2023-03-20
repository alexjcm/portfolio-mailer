import express from 'express';
import swaggerDocument from '../../swagger.json';
import swaggerUi from 'swagger-ui-express';

const router = express.Router();

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

export default router;