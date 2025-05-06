import express from 'express';
import {
  getAllEvents,
  createEvent,
  rsvpToEvent,
  checkInToEvent,
  deleteEvent,
  getRSVPsByEvent,
} from '../controllers/eventsController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getAllEvents); // Public
router.post('/create', authenticateToken, createEvent); // Admin
router.post('/rsvp', authenticateToken, rsvpToEvent); // Student
router.post('/checkin', authenticateToken, checkInToEvent); // Student
router.delete('/:eventId', authenticateToken, deleteEvent); // Admin
router.get('/:eventId/rsvps', authenticateToken, getRSVPsByEvent); // Admin

export default router;
