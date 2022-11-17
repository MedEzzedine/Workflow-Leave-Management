import { role } from "./roleModel";

export class userModel {
  email: string;
  id: number;
  nom: string;
  password: string;
  roles: role[];
  prenom: string;
  datenaissance: Date;
  adresse: string;
  firstlogin: boolean;
}
