import express from 'express';
import { validateJwt } from '../middlewares/authMiddleware.js';
import { registerStudent, registerTeacher, login } from '../controllers/authController.js';

const router = express.Router();

/* Ruta para el registro
router.post('/register', register);
*/

router.post('/register/student', registerStudent);

router.post('/register/teacher', validateJwt, registerTeacher);

router.post('/login',  login);

export default router;
