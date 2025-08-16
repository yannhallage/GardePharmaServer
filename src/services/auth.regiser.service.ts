

import Admin, { IAdmin } from '../models/admin.model';
import DataPharmacy, { Pharmacy } from '../models/pharmacy.model'
import bcrypt from 'bcrypt';



const loginAdmin = async (credentials: Partial<IAdmin>): Promise<IAdmin | null> => {
    const { email, password } = credentials;

    const admin = await Admin.findOne({ email });

    if (!admin) return null;

    const isMatch = await bcrypt.compare(password!, admin.password);

    if (!isMatch) return null;

    return admin;
};


const loginPharmacy = async (credentials: Partial<Pharmacy>): Promise<Pharmacy | null> => {
    const { email, password } = credentials;

    const pharma = await DataPharmacy.findOne({ email });

    if (!pharma) return null;

    const isMatch = await bcrypt.compare(password!, pharma.password);
    if (!isMatch) return null;
    console.log(pharma)
    return pharma;
}

const registerPharmacy = async (data: Partial<Pharmacy>): Promise<Pharmacy> => {
    const { email, password, ...rest } = data;

    if (!email || !password) {
        throw new Error('Email et mot de passe sont requis.');
    }

    const existingPharmacy = await DataPharmacy.findOne({ email });

    if (!existingPharmacy) {
        throw new Error("Aucune pharmacie trouvée avec cet email.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const identification = `PHARMA-${Date.now()}`;
    
    existingPharmacy.password = hashedPassword;
    existingPharmacy.identification = identification;

    Object.assign(existingPharmacy, rest);

    return await existingPharmacy.save();
};

export default {
    loginAdmin,
    loginPharmacy,
    registerPharmacy
};