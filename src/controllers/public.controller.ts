import PublicService from '../services/public.service';
import Garde from "../models/garde.model";
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

export const getGardes = async (req: Request, res: Response) => {
    try {
        const gardes = await Garde.aggregate([
            {
                $lookup: {
                    from: "pharmacies",
                    localField: "identification_pharma",
                    foreignField: "identification",
                    as: "pharmacyData",
                },
            },
            { $unwind: "$pharmacyData" },
            {
                $project: {
                    nom_pharmacie: 1,
                    commune: 1,
                    statut: 1,
                    date: 1,
                    description: "$pharmacyData.description",
                    lieu: "$pharmacyData.lieu",
                    email: "$pharmacyData.email",
                    numero: "$pharmacyData.numero",
                    image: "$pharmacyData.image",
                    imageType: "$pharmacyData.imageType",
                    itineraire: "$pharmacyData.itineraire",
                },
            },
        ]);

        const formatted = gardes.map((pharma: any) => {
            let base64Image: string | null = null;

            if (pharma.image && pharma.imageType) {
                if (pharma.image.buffer) {
                    // Cas MongoDB Binary
                    base64Image = `data:${pharma.imageType};base64,${Buffer.from(pharma.image.buffer).toString("base64")}`;
                } else if (Buffer.isBuffer(pharma.image)) {
                    // Cas Buffer Node.js
                    base64Image = `data:${pharma.imageType};base64,${pharma.image.toString("base64")}`;
                }
            }

            return {
                ...pharma,
                image: base64Image,
            };
        });

        res.status(200).json(formatted);
    } catch (error) {
        console.error("Erreur récupération gardes :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};
