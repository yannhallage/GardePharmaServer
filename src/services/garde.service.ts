import Garde, { IGarde } from '../models/garde.model';
import mongoose from 'mongoose';

export const getHistoriqueByPharmacyId = async (pharmacyId: string): Promise<IGarde[]> => {
    if (!mongoose.Types.ObjectId.isValid(pharmacyId)) {
        return [];
    }

    return await Garde.find({
        reference: pharmacyId,
        statut: 'validée',
    });
};

export const getConsulterGardeByPharmacyId = async (pharmacyId: string): Promise<IGarde[]> => {
    if (!mongoose.Types.ObjectId.isValid(pharmacyId)) {
        return [];
    }

    return await Garde.find({
        reference: pharmacyId,
        statut: 'en cours',
    });
};

export const createGarde = async (data: Partial<IGarde>): Promise<IGarde> => {
    const garde = new Garde(data);
    return await garde.save();
};


export default {
    getHistoriqueByPharmacyId,
    getConsulterGardeByPharmacyId,
    createGarde
};
