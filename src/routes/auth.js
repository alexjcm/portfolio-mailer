import { Router } from 'express';

import * as authController from '../controllers/auth';
import * as authValidations from '../middlewares/authBodyValidation';
import isAuthenticated from '../middlewares/isAuthenticated';
import validate from '../middlewares/validate';

const router = Router();

router.post('/auth/login', validate(authValidations.loginRules), authController.login);

router.post('/auth/register', validate(authValidations.registerRules), authController.register);

router.route('/auth/me').get(isAuthenticated, authController.getCurrentUser);
//   .put(isAuthenticated, validate(authValidations.updateProfileRules), authController.updateCurrentUser)
//   .delete(isAuthenticated, authController.deleteCurrentUser);

// router.put('/me/password',isAuthenticated, validate(authValidations.changePasswordRules), authController.updatePassword);

export default router;
