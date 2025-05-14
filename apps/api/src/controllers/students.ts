import { Response } from 'express';
import pool from '../db';
import { AuthRequest } from '../middleware/auth';
import { LocalizedRequest } from '../middleware/localization';

type LocalizedAuthRequest = AuthRequest & LocalizedRequest;

export const getStudents = async (req: LocalizedAuthRequest, res: Response) => {
  try {
    const isSpanish = req.locale === 'es';
    const nameField = isSpanish ? 'full_name_es' : 'full_name_en';

    const result = await pool.query(
      `SELECT s.id, s.${nameField} as full_name, s.grade_level, s.birth_date, s.guardian_name,
              u.email, u.username
       FROM students s
       JOIN users u ON s.user_id = u.id
       ORDER BY s.${nameField}`
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getStudentById = async (req: LocalizedAuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const isSpanish = req.locale === 'es';
    const nameField = isSpanish ? 'full_name_es' : 'full_name_en';

    const result = await pool.query(
      `SELECT s.id, s.${nameField} as full_name, s.grade_level, s.birth_date, s.guardian_name,
              u.email, u.username
       FROM students s
       JOIN users u ON s.user_id = u.id
       WHERE s.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}; 