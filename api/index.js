import dotenv from 'dotenv';
dotenv.config();

import { connectToDatabase } from '../utils/db.js';
import { createApp } from '../createApp.js';

let appPromise = (async () => {
  await connectToDatabase();
  return createApp();
})();

export default async function handler(req, res) {
  const app = await appPromise;
  return app(req, res);
}


