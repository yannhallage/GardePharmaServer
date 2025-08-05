import DataPharmacy from '../models/pharmacy.model';
import mongoose from 'mongoose';
import { Pharmacy as IPharmacy } from '../models/pharmacy.model';

const updatePharmacyById = async (
    id: string,
    updates: Partial<IPharmacy>
): Promise<IPharmacy | null> => {
    
    if (!mongoose.Types.ObjectId.isValid(id)) return null;

    return await DataPharmacy.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
    });
};


export default  {
    updatePharmacyById
}