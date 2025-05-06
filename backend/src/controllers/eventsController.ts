import { Request, Response } from 'express';
import pool from '../utils/db';

// 📋 Get all events
export const getAllEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query('SELECT * FROM events ORDER BY date ASC');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('❌ Error fetching events:', error);
    res.status(500).json({ message: 'Failed to fetch events' });
  }
};

// 🗓 Create new event
export const createEvent = async (req: Request, res: Response): Promise<void> => {
  const { title, date, location, description } = req.body;
  if (!title || !date || !location || !description) {
    res.status(400).json({ message: 'Missing required event fields' });
    return;
  }

  try {
    const result = await pool.query(
      'INSERT INTO events (title, date, location, description) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, date, location, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('❌ Error creating event:', error);
    res.status(500).json({ message: 'Failed to create event' });
  }
};

// ✍️ RSVP
export const rsvpToEvent = async (req: Request, res: Response): Promise<void> => {
  const { user_email, event_id } = req.body;

  if (!user_email || !event_id) {
    res.status(400).json({ message: 'Missing RSVP details' });
    return;
  }

  try {
    await pool.query('INSERT INTO rsvps (user_email, event_id) VALUES ($1, $2)', [
      user_email,
      event_id,
    ]);
    res.status(201).json({ message: 'RSVP successful' });
  } catch (error) {
    console.error('❌ RSVP error:', error);
    res.status(500).json({ message: 'Failed to RSVP' });
  }
};

// ✅ QR Check-in
export const checkInToEvent = async (req: Request, res: Response): Promise<void> => {
  const { user_email, event_id, status } = req.body;

  if (!user_email || !event_id || !status) {
    res.status(400).json({ message: 'Missing check-in data' });
    return;
  }

  try {
    await pool.query(
      'INSERT INTO attendance (user_email, event_id, status) VALUES ($1, $2, $3)',
      [user_email, event_id, status]
    );
    res.status(201).json({ message: 'Check-in successful' });
  } catch (error) {
    console.error('❌ Check-in error:', error);
    res.status(500).json({ message: 'Failed to check in' });
  }
};

// ❌ Delete Event
export const deleteEvent = async (req: Request, res: Response): Promise<void> => {
  const { eventId } = req.params;

  try {
    const result = await pool.query('DELETE FROM events WHERE id = $1', [eventId]);

    if (result.rowCount === 0) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('❌ Delete error:', error);
    res.status(500).json({ message: 'Failed to delete event' });
  }
};

// 👀 Get RSVPs by Event
export const getRSVPsByEvent = async (req: Request, res: Response): Promise<void> => {
  const { eventId } = req.params;

  try {
    const result = await pool.query(
      'SELECT user_email FROM rsvps WHERE event_id = $1',
      [eventId]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('❌ RSVP fetch error:', error);
    res.status(500).json({ message: 'Could not fetch RSVPs' });
  }
};
