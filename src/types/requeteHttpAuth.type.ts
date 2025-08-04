

export interface DonneesReçue {
    userType: string;
    email: string;
    password: string;
}

export interface PharmacyRegister {
    nom_pharmacie: string;
    chef_pharmacie: string;
    commune: string;
    details: string;
    numero: string;
    lieu: string;
    email: string;
    userType?: string;
    password: string;
}

export const tokenSecret: any = process.env.tokenSecret 