import { Pays } from './pays';
import { Role } from './role';

export interface Utilisateur {
  id?: number;
  prenom: string;
  nom: string;
  email: string;
  role: Role;
  pays?: Pays;
  createdAt?: Date;
  updatedAt?: Date;

  nomImageProfil?: string;
  imageProfil?: any;
}
