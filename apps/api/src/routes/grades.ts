import { Router } from 'express';
import { getGrades, getGradesByStudent } from '../controllers/grades';
import { authMiddleware } from '../middleware/auth';
import { localizationMiddleware } from '../middleware/localization';

const router = Router();

router.use(authMiddleware);
router.use(localizationMiddleware);

router.get('/', getGrades);
router.get('/student/:studentId', getGradesByStudent);

export { router as gradesRouter }; 