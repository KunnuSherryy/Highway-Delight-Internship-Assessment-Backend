import dotenv from 'dotenv';
dotenv.config();

import { createApp } from './createApp.js';
import { connectToDatabase } from './utils/db.js';
const port = process.env.PORT || 5000;

const app = createApp();

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


