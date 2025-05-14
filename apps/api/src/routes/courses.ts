import { Router } from 'express';
import { getCourses, getCourseById } from '../controllers/courses';
import { authMiddleware } from '../middleware/auth';
import { localizationMiddleware } from '../middleware/localization';

const router = Router();

router.use(authMiddleware);
router.use(localizationMiddleware);

router.get('/', getCourses);
router.get('/:id', getCourseById);

export { router as coursesRouter }; 