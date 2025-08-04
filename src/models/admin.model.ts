import mongoose, { Document, Schema } from 'mongoose';

export interface IAdmin extends Document {
  identification: string;
  nom: string;
  prenom: string;
  email: string;
  numero: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const AdminSchema: Schema = new Schema<IAdmin>(
  {
    identification: { type: String, required: true, unique: true },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    numero: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);


export default mongoose.model<IAdmin>('AdminPharma', AdminSchema);
