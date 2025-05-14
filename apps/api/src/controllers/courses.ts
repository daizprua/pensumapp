import { Response } from 'express';
import pool from '../db';
import { AuthRequest } from '../middleware/auth';
import { LocalizedRequest } from '../middleware/localization';

type LocalizedAuthRequest = AuthRequest & LocalizedRequest;

export const getCourses = async (req: LocalizedAuthRequest, res: Response) => {
  try {
    const isSpanish = req.locale === 'es';
    const nameField = isSpanish ? 'name_es' : 'name_en';
    const descField = isSpanish ? 'description_es' : 'description_en';
    const teacherNameField = isSpanish ? 't.full_name_es' : 't.full_name_en';

    const result = await pool.query(
      `SELECT c.id, c.${nameField} as name, c.${descField} as description,
              c.grade_level, ${teacherNameField} as teacher_name
       FROM courses c
       LEFT JOIN teachers t ON c.teacher_id = t.id
       ORDER BY c.${nameField}`
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getCourseById = async (req: LocalizedAuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const isSpanish = req.locale === 'es';
    const nameField = isSpanish ? 'name_es' : 'name_en';
    const descField = isSpanish ? 'description_es' : 'description_en';
    const teacherNameField = isSpanish ? 't.full_name_es' : 't.full_name_en';

    const result = await pool.query(
      `SELECT c.id, c.${nameField} as name, c.${descField} as description,
              c.grade_level, ${teacherNameField} as teacher_name
       FROM courses c
       LEFT JOIN teachers t ON c.teacher_id = t.id
       WHERE c.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}; 