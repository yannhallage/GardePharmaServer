import bcrypt from 'bcrypt';
import Admin, { IAdmin } from '../models/admin.model';

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

export default {
  create,
};
