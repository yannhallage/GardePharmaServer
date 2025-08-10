

export interface DonneesReçue {
  userType: string;
  email: string;
  password: string;
}

export interface PharmacyRegister {
  nom_pharmacie?: string;
  chef_pharmacie?: string;
  commune?: string;
  details?: string;
  numero?: string;
  lieu?: string;
  email?: string;
  userType?: string;
  password?: string;
}

export interface AdminType {
  nom?: string;
  prenom?: string;
  email?: string;
  numero?: string;
  password?: string;
}
export interface Garde {
  reference: string;
  date: Date;
  type: string;
  nom_pharmacie: string;
  responsable: string;
  lieu?: string;
  userId: string;
  identification_pharma: string;
  commune: string;
  statut: string;
  commentaire?: string;

}


export interface CreatePharmacyInput {
  nom_pharmacie: string;
  chef_pharmacie: string;
  commune: string;
  numero: string;
  email: string;
}

export const tokenSecret: any = process.env.tokenSecret 