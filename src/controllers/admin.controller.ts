import { Request, Response, NextFunction } from 'express';
import AdminService from '../services/admin.service';
import gardeService from '../services/garde.service'
import { AdminType, PharmacyRegister, CreatePharmacyInput } from '../types/requeteHttpAuth.type';

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

export const getAllPharmacy = async (req: Request, res: Response) => {
    try {
        const Allpharmacy = await AdminService.getAllPharmacyByAdmin();

        return res.status(200).json({
            success: true,
            message: 'toutes les pharmacies récupéré avec succès',
            data: Allpharmacy.map((item) => ({
                id: item._id,
                identification: item.identification,
                nom_pharmacie: item.nom_pharmacie,
                chef_pharmacie: item.chef_pharmacie,
                details: item.details,
                commune: item.commune,
                lieu: item.lieu,
                email: item.email,
                numero: item.numero,
            }))
        });
    } catch (error) {
        console.error('[Erreur Historique Gardes]', error);
        return res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des pharmacies',
        });
    }
};

export const ModifierProfil = async (req: Request, res: Response) => {
    const { id } = req.params;
    const requetDonnee: AdminType = req.body;

    if (id && requetDonnee) {
        try {
            console.log(id)
            const updatedPharmacy = await AdminService.updateAdminById(id, requetDonnee);

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
    } else {
        console.log('un problme')
    }
};

export const ajouterPharmacyParAdmin = async (req: Request, res: Response) => {
    try {
        const validatedData: CreatePharmacyInput = req.body;

        const { pharmacy, tempPassword } = await AdminService.ajouterPharmacyParAdmin(validatedData);

        res.status(201).json({
            message: 'Pharmacie ajoutée avec succès',
            // pharmacy,
            // mot_de_passe_temporaire: tempPassword,
        });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};