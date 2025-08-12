import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import App from './app';
import { connectToDatabase } from './config/database';
import { initNotificationSocket, sendNotificationToUser } from './sockets/notification.socket';

const startServer = async () => {
  await connectToDatabase();
  const app = new App();

  const server = http.createServer(app.app); // app.app c’est l’Express app

  // Initialise Socket.IO et ses événements
  const io = initNotificationSocket(server);

  // Exemple : expose io ou fonction d’envoi via global ou contexte si besoin
  // Par exemple, si tu veux envoyer une notif ailleurs, tu peux exporter sendNotificationToUser(io, userId, message)

  server.listen(app.port, () => {
    console.log(`🚀 Serveur lancé sur http://localhost:${app.port}`);
  });
};

startServer();
