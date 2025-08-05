


import { Request, Response } from 'express';
import gardeService from '../services/garde.service';
import { Garde } from '../types/requeteHttpAuth.type';

export const getHistoriqueGardeById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const garde = await gardeService.getHistoriqueByPharmacyId(id);

    if (!garde) {
        return res.status(404).json({ message: 'Garde non trouvée' });
    }
    res.json(garde);
};
export const getConsulterGardeById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const garde = await gardeService.getConsulterGardeByPharmacyId(id);

    if (!garde) {
        return res.status(404).json({ message: 'Garde non trouvée' });
    }
    res.json(garde);
};

export const creerGarde = async (req: Request, res: Response) => {
    try {
        const requeteHttp: Garde = req.body;
        const gardeCreer = await gardeService.createGarde(requeteHttp);
        return res.status(201).json(
            {
                message: 'Garde créée avec succès',
                statut: "ok",
            }
        );
    } catch (err) {
        console.error('[Erreur création garde]', err);
        return res.status(500).json({ error: 'Erreur serveur' });
    }
};
