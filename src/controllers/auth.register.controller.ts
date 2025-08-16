

import { Request, Response, NextFunction } from 'express';
import authRegisterService from '../services/auth.regiser.service';
import { DonneesReçue, PharmacyRegister, tokenSecret } from '../types/requeteHttpAuth.type'
import jwt from 'jsonwebtoken';
// import { Pharmacy } from '../models/pharmacy.model';

const SECRET = process.env.JWT_SECRET || tokenSecret;


export const authentification = async (req: Request, res: Response, next: NextFunction) => {

    const requeteHttp: DonneesReçue = req.body
    console.log(requeteHttp)
    if (requeteHttp.userType == 'admin') {
        try {

            const admin = await authRegisterService.loginAdmin(requeteHttp);
            if (!admin) {
                return res.status(401).json({ error: 'Email ou mot de passe invalide (admin)' });
            }
            const token = jwt.sign(
                {
                    id: admin._id,
                    email: admin.email,
                    role: requeteHttp.userType,
                },
                SECRET,
                { expiresIn: '2h' }
            );

            // console.log(admin.email)
            return res.status(200).json({
                message: 'Connexion réussie',
                token,
                user: {
                    id: admin._id,
                    nom: admin.nom,
                    prenom: admin.prenom,
                    email: admin.email,
                    numero: admin.numero,
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
            console.log(pharmacy)
            if (!pharmacy) {
                return res.status(401).json({ error: 'Email ou mot de passe invalide' });
            }
            const token = jwt.sign(
                {
                    id: pharmacy._id,
                    email: pharmacy.email,
                    role: requeteHttp.userType,
                },
                SECRET,
                { expiresIn: '2h' }
            );
            return res.status(200).json({
                message: 'Connexion réussie',
                token,
                user: {
                    _id: pharmacy._id,
                    identification: pharmacy.identification,
                    nom_pharmacie: pharmacy.nom_pharmacie,
                    chef_pharmacie: pharmacy.chef_pharmacie,
                    email: pharmacy.email,
                    details: pharmacy.details,
                    commune: pharmacy.commune,
                    lieu: pharmacy.lieu,
                    userType: requeteHttp.userType,
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

        const token = jwt.sign(
            {
                id: pharmacieCree._id,
                email: pharmacieCree.email,
                role: requeteHttp.userType,
            },
            SECRET,
            { expiresIn: '2h' }
        );
        res.status(201).json({
            message: 'Pharmacie enregistrée avec succès',
            token,
            user: {
                id: pharmacieCree._id,
                identification: pharmacieCree.identification,
                nom_pharmacie: pharmacieCree.nom_pharmacie,
                chef_pharmacie: pharmacieCree.chef_pharmacie,
                details: pharmacieCree.details,
                email: pharmacieCree.email,
                commune: pharmacieCree.commune,
                lieu: pharmacieCree.lieu,
                userType: 'pharmacy',
                numero: pharmacieCree.numero,
            },
        });
    } catch (err) {
        console.error('[Register Error]', err);
        res.status(500).json({ error: 'Erreur serveur lors de l\'inscription' });
    }
};