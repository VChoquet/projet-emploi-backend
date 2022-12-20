import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { Annonce } from './annonce.entity';
import { CreateAnnonceDto } from './CreateAnnonce.dto';

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

    async addAnnonce(newAnnonce: Annonce): Promise<InsertResult> {
        return await this.annonceRepo.insert(newAnnonce);
    }
}
