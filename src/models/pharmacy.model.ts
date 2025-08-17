import mongoose, { Document, Schema } from 'mongoose';

export interface Pharmacy extends Document {
  identification: string;
  nom_pharmacie: string;
  chef_pharmacie: string;
  commune: string;
  details: string;
  lieu: string;
  description: string;
  itineraire: string;
  email: string;
  numero: string;
  image?: Buffer; // <-- image stockée en binaire
  imageType?: string; // <-- type MIME
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const Pharmacy: Schema = new Schema<Pharmacy>(
  {
    identification: { type: String, required: true, unique: true },
    nom_pharmacie: { type: String, required: true },
    chef_pharmacie: { type: String, required: true },
    // details: { type: String, required: true },
    details: { type: String, required: false, default: "" },
    commune: { type: String, required: true },
    // itineraire: { type: String, required: true },
    itineraire: { type: String, required: false, default: "" },
    // description: { type: String, required: true },
    description: { type: String, required: false, default: "" },
    // lieu: { type: String, required: true },
    lieu: { type: String, required: false, default: "" },
    email: { type: String, required: true, unique: true },
    numero: { type: String, required: true },
    image: { type: Buffer },
    imageType: { type: String },
    password: { type: String, required: true },
  },
  { timestamps: true }
);


export default mongoose.model<Pharmacy>('Pharmacy', Pharmacy);
