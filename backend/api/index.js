import 'dotenv/config';
import app from '../src/app.js';
import { connectDB } from '../src/config/db.js';
import { initFirebase } from '../src/config/firebase.js';
import { ensureSeeded } from '../src/utils/ensureSeeded.js';

let initialized = false;

const initialize = async () => {
  if (initialized) return;
  initialized = true;

  try {
    await connectDB();
    await ensureSeeded();
    console.log('Database initialized');
  } catch (err) {
    console.warn(`MongoDB unavailable (${err.message}). Using fallback data.`);
  }

  try {
    initFirebase();
    console.log('Firebase initialized');
  } catch (err) {
    console.warn(`Firebase unavailable: ${err.message}`);
  }
};

export default async (req, res) => {
  await initialize();
  return app(req, res);
};
