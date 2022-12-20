import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Candidature {
    @PrimaryGeneratedColumn({
        type: 'bigint',
    })
    id: number;

    @Column({
        nullable: false,
        default: '',
    })
    nom: string;

    @Column({
        nullable: false,
        default: '',
    })
    prenom: string;

    @Column({
        nullable: false,
        default: '',
    })
    email: string;

    @Column({
        nullable: false,
        default: '',
    })
    pathCV: string;
}
