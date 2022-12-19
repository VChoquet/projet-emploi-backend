import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Annonce {
    @PrimaryGeneratedColumn({
        type: 'bigint',
    })
    id: number;

    @Column({
        nullable: false,
        default: '',
    })
    nom_employeur: string;

    @Column({
        nullable: false,
        default: '',
    })
    email: string;

    @Column({
        nullable: false,
        default: '',
    })
    intitule: string;

    @Column({
        nullable: false,
        default: '',
    })
    ville: string;

    @Column({
        nullable: false,
        default: '',
    })
    description: string;

    @Column({
        nullable: false,
        default: '',
    })
    type_contrat: string;
}
