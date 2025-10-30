import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import http from 'http';
import morgan from 'morgan';

import { connectToDatabase } from './utils/db.js';
import experiencesRouter from './routes/experiences.js';
import bookingsRouter from './routes/bookings.js';
import promoRouter from './routes/promo.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandlers.js';

// create Express app and HTTP server
const app = express();
const server = http.createServer(app);

// middleware
app.use(express.json({ limit: '4mb' }));
const corsOptions = {
  origin: "*",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};
app.use(cors(corsOptions));
app.use(morgan('dev'));

// routes
app.get('/', (req, res) => res.send('Server is live'));
app.use('/experiences', experiencesRouter);
app.use('/bookings', bookingsRouter);
app.use('/promo', promoRouter);

app.use(notFoundHandler);
app.use(errorHandler);

// connect DB and optionally listen (in dev/local)
await connectToDatabase();
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => console.log('Server is running on port:' + PORT));
}

export default server;


