

import { Request, Response, NextFunction } from 'express';
import authRegisterService from '../services/auth.regiser.service';
import { DonneesReçue, PharmacyRegister } from '../types/requeteHttpAuth.type'



export const authentification = async (req: Request, res: Response, next: NextFunction) => {

    const requeteHttp: DonneesReçue = req.body

    if (requeteHttp.userType == 'admin') {
        try {

            const admin = await authRegisterService.loginAdmin(requeteHttp);

            if (!admin) {
                return res.status(401).json({ error: 'Email ou mot de passe invalide' });
            }

            return res.status(200).json({
                message: 'Connexion réussie',
                user: {
                    id: admin._id,
                    nom: admin.nom,
                    prenom: admin.prenom,
                    email: admin.email,
                    userType: 'admin',
                },
            });
        } catch (err) {
            console.error('[Login Error]', err);
            res.status(500).json({ error: 'Erreur serveur' });
        }
    } else {
        try {

            const pharmacy = await authRegisterService.loginPharmacy(requeteHttp);

            if (!pharmacy) {
                return res.status(401).json({ error: 'Email ou mot de passe invalide' });
            }

            return res.status(200).json({
                message: 'Connexion réussie',
                user: {
                    identification: pharmacy.identification,
                    nom_pharmacie: pharmacy.nom_pharmacie,
                    chef_pharmacie: pharmacy.chef_pharmacie,
                    email: pharmacy.email,
                    details: pharmacy.details,
                    commune: pharmacy.commune,
                    lieu: pharmacy.lieu,
                    numero: pharmacy.numero,
                },
            });
        } catch (err) {
            console.error('[Login Error]', err);
            res.status(500).json({ error: 'Erreur serveur' });
        }
    }
}

export const inscriptionPharmacy = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const requeteHttp: PharmacyRegister = req.body;

        const pharmacieCree = await authRegisterService.registerPharmacy(requeteHttp);

        res.status(201).json({
            message: 'Pharmacie enregistrée avec succès',
            data: {
                id: pharmacieCree._id,
                identification: pharmacieCree.identification,
                nom_pharmacie: pharmacieCree.nom_pharmacie,
                email: pharmacieCree.email,
                commune: pharmacieCree.commune,
                numero: pharmacieCree.numero,
            },
        });
    } catch (err) {
        console.error('[Register Error]', err);
        res.status(500).json({ error: 'Erreur serveur lors de l\'inscription' });
    }
};