import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import experiencesRouter from './routes/experiences.js';
import bookingsRouter from './routes/bookings.js';
import promoRouter from './routes/promo.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandlers.js';
import { connectToDatabase } from './utils/db.js';

const app = express();
const port = process.env.PORT || 5000;

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

async function start() {
  await connectToDatabase();
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server', err);
  process.exit(1);
});


