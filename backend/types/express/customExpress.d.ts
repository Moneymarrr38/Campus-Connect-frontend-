// backend/src/types/express/index.d.ts

import express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        roles: string[];
      };
    }
  }
}
