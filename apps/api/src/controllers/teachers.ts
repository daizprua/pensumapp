import { Response } from 'express';
import pool from '../db';
import { AuthRequest } from '../middleware/auth';
import { LocalizedRequest } from '../middleware/localization';

type LocalizedAuthRequest = AuthRequest & LocalizedRequest;

export const getTeachers = async (req: LocalizedAuthRequest, res: Response) => {
  try {
    const isSpanish = req.locale === 'es';
    const nameField = isSpanish ? 'full_name_es' : 'full_name_en';
    const specialtyField = isSpanish ? 'subject_specialty_es' : 'subject_specialty_en';

    const result = await pool.query(
      `SELECT t.id, t.${nameField} as full_name, t.${specialtyField} as subject_specialty,
              u.email, u.username
       FROM teachers t
       JOIN users u ON t.user_id = u.id
       ORDER BY t.${nameField}`
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching teachers:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getTeacherById = async (req: LocalizedAuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const isSpanish = req.locale === 'es';
    const nameField = isSpanish ? 'full_name_es' : 'full_name_en';
    const specialtyField = isSpanish ? 'subject_specialty_es' : 'subject_specialty_en';

    const result = await pool.query(
      `SELECT t.id, t.${nameField} as full_name, t.${specialtyField} as subject_specialty,
              u.email, u.username
       FROM teachers t
       JOIN users u ON t.user_id = u.id
       WHERE t.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching teacher:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}; 