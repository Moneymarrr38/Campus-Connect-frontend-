import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../utils/db';

export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    const existing = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      res.status(409).json({ message: 'User already exists' });
      return;
    }

    const hashed = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (email, password, role) VALUES ($1, $2, $3)', [email, hashed, role]);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, email: user.email, role: user.role });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
