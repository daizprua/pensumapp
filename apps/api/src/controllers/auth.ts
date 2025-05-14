import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import pool from '../db';
import { LoginRequest, RegisterRequest } from '../types';

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password }: LoginRequest = req.body;

    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    const user = result.rows[0];

    if (!user || !await bcrypt.compare(password, user.password_hash)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      config.api.jwtSecret,
      { expiresIn: '24h' }
    );

    res.json({ token, user: { ...user, password_hash: undefined } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password, role, preferred_language }: RegisterRequest = req.body;

    const existingUser = await pool.query(
      'SELECT * FROM users WHERE username = $1 OR email = $2',
      [username, email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (username, email, password_hash, role, preferred_language) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [username, email, password_hash, role, preferred_language]
    );

    const user = result.rows[0];
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      config.api.jwtSecret,
      { expiresIn: '24h' }
    );

    res.status(201).json({ token, user: { ...user, password_hash: undefined } });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}; 