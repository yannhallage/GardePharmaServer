import DataPharmacy from '../models/pharmacy.model';
import mongoose from 'mongoose';
import { Pharmacy as IPharmacy } from '../models/pharmacy.model';


const updatePharmacyById = async (
    _id: string,
    updates: Partial<IPharmacy>
): Promise<IPharmacy | null> => {

    if (!mongoose.Types.ObjectId.isValid(_id)) return null;

    return await DataPharmacy.findByIdAndUpdate(_id, updates, {
        new: true,
        runValidators: true,
    });
};




export default {
    updatePharmacyById
}