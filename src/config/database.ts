// src/config/database.ts
import mongoose from 'mongoose';

export const connectToDatabase = async (): Promise<void> => {
    try {
        const mongoURI = process.env.MONGO_URI || '';
        await mongoose.connect(mongoURI);
        console.log('✅ Connexion à MongoDB réussie');
    } catch (error) {
        console.error('❌ Erreur de connexion à MongoDB :', error);
        process.exit(1); // Arrête le serveur si la DB ne répond pas
    }
};
