import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import experiencesRouter from './routes/experiences.js';
import bookingsRouter from './routes/bookings.js';
import promoRouter from './routes/promo.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandlers.js';

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/experiences', experiencesRouter);
  app.use('/bookings', bookingsRouter);
  app.use('/promo', promoRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
}


