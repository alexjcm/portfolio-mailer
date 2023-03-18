import express from 'express';
import { bodyEmailValidation } from '../utils/validations';
import * as mailerController from '../controllers/mailer';

const router = express.Router();

router.post('/mailer/sendMail', bodyEmailValidation, mailerController.sendEmail);
router.get('/mailer/test', mailerController.testSTMPConection);

router.get('/testSentry', mailerController.testSentry);

export default router;
