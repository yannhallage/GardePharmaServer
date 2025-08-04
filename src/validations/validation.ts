
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

export const AuthSchema = z.object({
  userType: z.enum(['admin', 'pharmacy']),
  email: z.string().email(),
  password: z.string().min(6)
});