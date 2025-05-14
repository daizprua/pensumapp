import { Router } from 'express';
import { getTeachers, getTeacherById } from '../controllers/teachers';
import { authMiddleware } from '../middleware/auth';
import { localizationMiddleware } from '../middleware/localization';

const router = Router();

router.use(authMiddleware);
router.use(localizationMiddleware);

router.get('/', getTeachers);
router.get('/:id', getTeacherById);

export { router as teachersRouter }; 