import PublicService from '../services/public.service';
import { Request, Response, NextFunction } from 'express';



export const getAllNotification = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const notifications = await PublicService.getAllNotification(id);

        return res.status(200).json({
            success: true,
            message: 'Toutes les notifications récupérées avec succès',
            data: notifications.map((n) => ({
                message: n.message,
                date: n.date
            }))
        });
    } catch (error) {
        console.error('[Erreur récupération notifications]', error);
        return res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des notifications',
        });
    }
};


export const postNotification = async (req: Request, res: Response) => {
    try {
        const { userId, message } = req.body;

        if (!userId || !message) {
            return res.status(400).json({ error: 'userId et message requis' });
        }

        const notification = await PublicService.createNotification(userId, message);
        return res.status(201).json(notification);

    } catch (error) {
        console.error('[Erreur création notification]', error);
        return res.status(500).json({ error: 'Erreur serveur' });
    }
};