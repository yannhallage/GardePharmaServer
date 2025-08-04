

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

    if (!pharma || pharma.password !== password) {
        return null;
    }
    const isMatch = await bcrypt.compare(password!, pharma.password);
    if (!isMatch) return null;
    return pharma;
}

const registerPharmacy = async (data: Partial<Pharmacy>): Promise<Pharmacy> => {
    const { password, ...rest } = data;

    const hashedPassword = await bcrypt.hash(password!, 10);

    const identification = `PHARMA-${Date.now()}`;

    const newPharmacy = new DataPharmacy({
        ...rest,
        password: hashedPassword,
        identification,
    });

    return await newPharmacy.save();
};

export default {
    loginAdmin,
    loginPharmacy,
    registerPharmacy
};