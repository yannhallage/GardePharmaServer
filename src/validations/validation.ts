
import { z } from 'zod';

export const adminSchema = z.object({
  identification: z.string().min(3, 'identification trop courte'),
  nom: z.string().min(2, 'nom trop court'),
  prenom: z.string().min(2, 'prenom trop court'),
  email: z.string().email('email invalide'),
  numero: z.string().min(8, 'numéro trop court'),
  password: z.string().min(6, 'mot de passe trop court'),
});

export const pharmacyRegisterSchema = z.object({
  nom_pharmacie: z.string().min(2, 'Le nom de la pharmacie est requis'),
  chef_pharmacie: z.string().min(2, 'Le nom du chef de pharmacie est requis'),
  commune: z.string().min(2, 'La commune est requise'),
  details: z.string().optional(),
  numero: z.string().min(7, 'Le numéro est requis').max(20, 'Numéro trop long'),
  lieu: z.string().min(2, 'Le lieu est requis'),
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  userType: z.literal('pharmacy').optional()
});

export const pharmacyRegisterSchemaByAdmin = z.object({
  nom_pharmacie: z.string().min(2, 'Le nom de la pharmacie est requis'),
  chef_pharmacie: z.string().min(2, 'Le nom du chef de pharmacie est requis'),
  commune: z.string().min(2, 'La commune est requise'),
  numero: z.string().min(7, 'Le numéro est requis').max(20, 'Numéro trop long'),
  email: z.string().email('Email invalide'),
});

export const AuthSchema = z.object({
  userType: z.enum(['admin', 'pharmacy']),
  email: z.string().email(),
  password: z.string().min(6)
});

// cas utilsant l'id pour obtenir des infos
export const gardeIdSchema = z.object({
  id: z.string().regex(/^[a-f\d]{24}$/i, 'Identifiant invalide'),
});

// gardes schema 
export const gardeCreerSchema = z.object({
  reference: z.string().min(1, 'La référence est requise'),
  date: z.string().datetime({ message: 'La date doit être au format ISO' }),
  type: z.string().min(1, 'Le type est requis'),
  nom_pharmacie: z.string().min(1, 'Le nom de la pharmacie est requis'),
  responsable: z.string().min(1, 'Le responsable est requis'),
  commune: z.string().min(1, 'La commune est requise'),
  userId: z.string().min(1, 'utilisateur pharmacie est requise'),
  statut: z.string().min(1, 'Le statut est requis'),
  commentaire: z.string().optional(),
});

export const profilUpdateSchema = z.object({
  nom_pharmacie: z.string().min(2, 'Le nom de la pharmacie est requis').optional(),
  chef_pharmacie: z.string().min(2, 'Le nom du chef de pharmacie est requis').optional(),
  commune: z.string().min(2, 'La commune est requise').optional(),
  details: z.string().optional().optional(),
  numero: z.string().min(7, 'Le numéro est requis').max(20, 'Numéro trop long').optional(),
  lieu: z.string().min(2, 'Le lieu est requis').optional(),
  email: z.string().email('Email invalide').optional(),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères').optional(),
});

// update pour admin
export const profilUpdateSchemaAdmin = z.object({
  nom: z.string().min(2, 'Le nom admin est requis'),
  prenom: z.string().min(2, 'Le prenom admin est requis'),
  email: z.string().email('Email invalide'),
  numero: z.string().min(7, 'Le numéro est requis').max(20, 'Numéro trop long'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères').optional(),
});