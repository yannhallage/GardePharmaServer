import { Server as HttpServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';

let io: SocketIOServer;

export const initNotificationSocket = (server: HttpServer): SocketIOServer => {
    io = new SocketIOServer(server, {
        cors: {
            origin: process.env.NODE_ENV === 'production'
                ? ['https://your-production-url.com']
                : ['http://localhost:3000', 'http://localhost:5173'],
            credentials: true,
        },
    });

    io.on('connection', (socket: Socket) => {
        console.log(`Client connecté : ${socket.id}`);

        socket.on('joinRoom', (userId: string) => {
            socket.join(userId);
            console.log(`Socket ${socket.id} rejoint la room ${userId}`);
        });

        socket.on('disconnect', () => {
            console.log(`Client déconnecté : ${socket.id}`);
        });
    });

    return io;
};

export const sendNotificationToUser = (userId: string, message: string) => {
    if (!io) {
        console.error('Socket.IO non initialisé');
        return;
    }
    io.to(userId).emit('notification', { message });
};
