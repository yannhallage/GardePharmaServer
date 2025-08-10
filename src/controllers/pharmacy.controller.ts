


import { Request, Response } from 'express';
import gardeService from '../services/garde.service';
import { Garde, PharmacyRegister } from '../types/requeteHttpAuth.type';
import modifierProfil from '../services/account.service'

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

    console.log(garde)
    res.json(garde);
};

export const creerGarde = async (req: Request, res: Response) => {
    try {
        const requeteHttp: Garde = req.body;
        console.log(requeteHttp)
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


export const ModifierProfil = async (req: Request, res: Response) => {
    const { id } = req.params;
    const requetDonnee: PharmacyRegister = req.body;

    try {
        const updatedPharmacy = await modifierProfil.updatePharmacyById(id, requetDonnee);

        if (!updatedPharmacy) {
            return res.status(404).json({ error: 'Pharmacie introuvable' });
        }

        return res.status(200).json({
            message: 'Profil mis à jour avec succès',
            data: updatedPharmacy,
        });
    } catch (error) {
        console.error('[Update Pharmacy Error]', error);
        return res.status(500).json({ error: 'Erreur serveur' });
    }
};

