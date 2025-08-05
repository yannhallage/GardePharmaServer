import { Request, Response, NextFunction } from 'express';
import AdminService from '../services/admin.service';
import gardeService from '../services/garde.service'

export const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newAdmin = await AdminService.create(req.body);
        res.status(201).json(newAdmin);
    } catch (err) {
        next(err);
    }
};


export const getAllHistoriqueGardes = async (req: Request, res: Response) => {
    try {
        const gardes = await gardeService.getAllHistoriqueByAdmin();

        return res.status(200).json({
            success: true,
            message: 'Historique des gardes récupéré avec succès',
            data: gardes,
        });
    } catch (error) {
        console.error('[Erreur Historique Gardes]', error);
        return res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des gardes',
        });
    }
};
export const getAllGardes = async (req: Request, res: Response) => {
    try {
        const gardes = await gardeService.getAllGardeByAdmin();

        return res.status(200).json({
            success: true,
            message: 'toutes les gardes récupéré avec succès',
            data: gardes,
        });
    } catch (error) {
        console.error('[Erreur Historique Gardes]', error);
        return res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des gardes',
        });
    }
};