import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Annonce } from './annonce-entity';

@Injectable()
export class AnnoncesService {
    constructor(
        @InjectRepository(Annonce)
        private readonly annonceRepo: Repository<Annonce>,
    ) {}

    async getAnnonces(): Promise<Annonce[]> {
        return await this.annonceRepo.find();
    }

    async getAnnonce(id: number): Promise<Annonce> {
        const annonce = await this.annonceRepo.findOne({ where: { id } });
        if (!annonce) {
            throw new NotFoundException('Aucune annonce ne correspond');
        }
        return annonce;
    }

    updateAnnonce(
        nom_employeur: string,
        email: string,
        intitule: string,
        ville: string,
        description: string,
        type_contrat: string,
    ) {
        const newAnnonce = new Annonce();
        newAnnonce.nom_employeur = nom_employeur;
        newAnnonce.email = email;
        newAnnonce.intitule = intitule;
        newAnnonce.ville = ville;
        newAnnonce.description = description;
        newAnnonce.type_contrat = type_contrat;
        this.annonceRepo.save(newAnnonce);
    }
}
