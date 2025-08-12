import bcrypt from 'bcrypt';
import Garde, { IGarde } from '../models/garde.model';
import mongoose from 'mongoose';
// import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import Admin, { IAdmin } from '../models/admin.model';
import NotificationSchema, { INotification } from '../models/notificaiton.model';

import DataPharmacy, { Pharmacy } from '../models/pharmacy.model'
import { CreatePharmacyInput } from '../types/requeteHttpAuth.type';

const create = async (data: Partial<IAdmin>): Promise<IAdmin> => {
  if (!data.password) {
    throw new Error("Le mot de passe est requis");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const admin = new Admin({
    ...data,
    password: hashedPassword,
  });

  return await admin.save();
};

const ajouterPharmacyParAdmin = async (
  data: CreatePharmacyInput
): Promise<{ pharmacy: Pharmacy; tempPassword: string }> => {

  const tempPassword = uuidv4().slice(0, 10);
  const hashedPassword = await bcrypt.hash(tempPassword, 10);

  const pharmacy = new DataPharmacy({
    identification: `TEMP-${Date.now()}`,
    nom_pharmacie: data.nom_pharmacie,
    chef_pharmacie: data.chef_pharmacie,
    commune: data.commune,
    numero: data.numero,
    email: data.email,
    password: hashedPassword,
    lieu: 'À définir',
    details: 'À compléter',
  });

  const savedPharmacy = await pharmacy.save();

  return {
    pharmacy: savedPharmacy,
    tempPassword,
  };
};

const updateAdminById = async (
  _id: string,
  updates: Partial<IAdmin>
): Promise<IAdmin | null> => {
  if (!mongoose.Types.ObjectId.isValid(_id)) return null;

  return await Admin.findByIdAndUpdate(_id, updates, {
    new: true,
    runValidators: true,
  });
};

const updateGardeByAdmin = async (_id: string) => {
  if (!mongoose.Types.ObjectId.isValid(_id)) return null;

  // console.log(_id)
  const updates = {
    statut: "en cours",
  };

  return await Garde.findByIdAndUpdate(_id, updates, {
    new: true,
    runValidators: true,
  });
};
const deleteGardeByAdmin = async (_id: string) => {
  if (!mongoose.Types.ObjectId.isValid(_id)) return null;

  return await Garde.findByIdAndDelete(_id);
};



export const getAllPharmacyByAdmin = async (): Promise<Pharmacy[]> => {
  return await DataPharmacy.find({});
};


// sous requets
export const getAllNotification = async (userId: string): Promise<INotification[]> => {
  return await NotificationSchema.find({ userId }).sort({ date: -1 });
};

export const createNotification = async (
  Id: string,
  msm: string,
): Promise<INotification> => {
  const notification = new NotificationSchema({
    userId: Id,
    message: msm,
    date: new Date(),
  });
  return await notification.save();
};



export default {
  create,
  ajouterPharmacyParAdmin,
  updateGardeByAdmin,
  getAllPharmacyByAdmin,
  createNotification,
  deleteGardeByAdmin,
  getAllNotification,
  updateAdminById,
};
