import mongoose, { Document, Schema } from 'mongoose';

export interface Pharmacy extends Document {
  identification: string;
  nom_pharmacie: string;
  chef_pharmacie: string;
  commune: string;
  details: string;
  lieu: string;
  email: string;
  numero: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const Pharmacy: Schema = new Schema<Pharmacy>(
  {
    identification: { type: String, required: true, unique: true },
    nom_pharmacie: { type: String, required: true },
    chef_pharmacie: { type: String, required: true },
    details: { type: String, required: true },
    commune: { type: String, required: true },
    lieu: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    numero: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);


export default mongoose.model<Pharmacy>('Pharmacy', Pharmacy);
