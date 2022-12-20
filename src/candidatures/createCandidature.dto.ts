import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateCandidatureDto {
    id: number;

    @IsNotEmpty()
    nom: string;

    @IsNotEmpty()
    prenom: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    pathCV: string;
}
