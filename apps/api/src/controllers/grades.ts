import { Response } from 'express';
import pool from '../db';
import { AuthRequest } from '../middleware/auth';
import { LocalizedRequest } from '../middleware/localization';

type LocalizedAuthRequest = AuthRequest & LocalizedRequest;

export const getGrades = async (req: LocalizedAuthRequest, res: Response) => {
  try {
    const isSpanish = req.locale === 'es';
    const studentNameField = isSpanish ? 's.full_name_es' : 's.full_name_en';
    const courseNameField = isSpanish ? 'c.name_es' : 'c.name_en';

    const result = await pool.query(
      `SELECT g.id, g.grade, g.period,
              ${studentNameField} as student_name,
              ${courseNameField} as course_name,
              s.grade_level
       FROM grades g
       JOIN students s ON g.student_id = s.id
       JOIN courses c ON g.course_id = c.id
       ORDER BY ${studentNameField}, ${courseNameField}`
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching grades:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getGradesByStudent = async (req: LocalizedAuthRequest, res: Response) => {
  try {
    const { studentId } = req.params;
    const isSpanish = req.locale === 'es';
    const studentNameField = isSpanish ? 's.full_name_es' : 's.full_name_en';
    const courseNameField = isSpanish ? 'c.name_es' : 'c.name_en';

    const result = await pool.query(
      `SELECT g.id, g.grade, g.period,
              ${studentNameField} as student_name,
              ${courseNameField} as course_name,
              s.grade_level
       FROM grades g
       JOIN students s ON g.student_id = s.id
       JOIN courses c ON g.course_id = c.id
       WHERE s.id = $1
       ORDER BY ${courseNameField}`,
      [studentId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching student grades:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}; 