
import dotenv from 'dotenv';
dotenv.config();

import App from './app';
import { connectToDatabase } from './config/database';

const startServer = async () => {
  await connectToDatabase();
  const app = new App();
  app.listen();
};

startServer();
