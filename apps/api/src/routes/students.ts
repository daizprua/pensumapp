import { Router } from 'express';
import { getStudents, getStudentById } from '../controllers/students';
import { authMiddleware } from '../middleware/auth';
import { localizationMiddleware } from '../middleware/localization';

const router = Router();

router.use(authMiddleware);
router.use(localizationMiddleware);

router.get('/', getStudents);
router.get('/:id', getStudentById);

export { router as studentsRouter }; 