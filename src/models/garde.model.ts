import mongoose, { Schema, Document } from 'mongoose';

export interface IGarde extends Document {
  reference: string;
  date: Date;
  type: string;
  nom_pharmacie: string;
  responsable: string;
  commune: string;
  statut: string;
  commentaire?: string;
  createdAt: Date;
  updatedAt: Date;
}

const GardeSchema: Schema = new Schema<IGarde>(
  {
    reference: { type: String, required: true, unique: true },
    date: { type: Date, required: true },
    type: { type: String, required: true },
    nom_pharmacie: { type: String, required: true },
    responsable: { type: String, required: true },
    commune: { type: String, required: true },
    statut: { type: String, required: true },
    commentaire: { type: String, required: false },
  },
  { timestamps: true }
);

export default mongoose.model<IGarde>('Garde', GardeSchema);
