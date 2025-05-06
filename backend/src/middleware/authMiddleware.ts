import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    roles: string[]; // like ['admin'] or ['student']
  };
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Access token missing' });
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      email: string;
      roles: string[];
    };

    req.user = {
      id: payload.id,
      email: payload.email,
      roles: payload.roles,
    };

    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};
