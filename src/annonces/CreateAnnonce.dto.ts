import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAnnonceDto {
    id: number;

    @IsNotEmpty()
    nom_employeur: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    intitule: string;

    @IsNotEmpty()
    ville: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    type_contrat: string;

    nb_visite: number;

    @IsNotEmpty()
    date_creation: string;
}
