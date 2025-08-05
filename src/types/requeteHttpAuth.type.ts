

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
export interface Garde {
  reference: string;
  date: Date;
  type: string;
  nom_pharmacie: string;
  responsable: string;
  lieu: string;
  commune: string;
  statut: string;
  commentaire?: string;

}

export const tokenSecret: any = process.env.tokenSecret 