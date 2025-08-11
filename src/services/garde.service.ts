import Garde, { IGarde } from '../models/garde.model';
import {
    UpdateGardes
} from '../types/requeteHttpAuth.type';
import mongoose from 'mongoose';

export const getHistoriqueByPharmacyId = async (pharmacyId: string): Promise<IGarde[]> => {
    if (!mongoose.Types.ObjectId.isValid(pharmacyId)) {
        return [];
    }
    return await Garde.find({
        userId: pharmacyId,
        statut: { $in: ['validée', 'refusée'] },
    });
};

export const getAllHistoriqueByAdmin = async (): Promise<IGarde[]> => {
    return await Garde.find({
        statut: { $in: ['validée', 'refusée'] },
    });
};

export const getAllGardeByAdmin = async (): Promise<IGarde[]> => {
    return await Garde.find({
        statut: { $in: ['en cours', 'en attente'] },
    });
};

export const getConsulterGardeByPharmacyId = async (pharmacyId: string): Promise<IGarde[]> => {
    if (!mongoose.Types.ObjectId.isValid(pharmacyId)) {
        return [];
    }

    return await Garde.find({
        userId: pharmacyId,
        statut: { $in: ['en cours', 'en attente'] },
    });
};

export const createGarde = async (data: Partial<IGarde>): Promise<IGarde> => {
    const garde = new Garde(data);
    return await garde.save();
};

export const updateGardeById = async (
    data: UpdateGardes
): Promise<IGarde | null> => {
    if (!mongoose.Types.ObjectId.isValid(data.id_garde)) {
        throw new Error('Id invalide');
    }

    const updateFields: Partial<IGarde> = {
        date: new Date(data.newDate),
        statut: data.statut,
        commentaire: data.comments,
    };

    const updatedGarde = await Garde.findByIdAndUpdate(data.id_garde, updateFields, {
        new: true,
        runValidators: true,
    });

    return updatedGarde;
};

export default {
    getHistoriqueByPharmacyId,
    getConsulterGardeByPharmacyId,
    createGarde,
    updateGardeById,
    getAllHistoriqueByAdmin,
    getAllGardeByAdmin
};
