import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { Pool } from 'pg';

import authRoutes from './routes/auth';
import eventRoutes from './routes/events'; // ✅ Required!

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// ✅ PostgreSQL Pool (used in db.ts or controllers)
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// ✅ Middleware
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(express.json()); // ✅ Required to parse JSON in POST body

// ✅ Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes); // ✅ This enables /api/events/create, etc.

// 🩺 Health check
app.get('/api/health', (req, res) => {
  res.send({ status: 'ok', message: 'Server is running' });
});

// 🔌 DB test
app.get('/api/db-health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ status: 'ok', dbTime: result.rows[0].now });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
