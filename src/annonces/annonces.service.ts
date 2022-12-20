import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
        return this.findAnnonce(id);
    }

    async addAnnonce(createAnnonceDto: CreateAnnonceDto): Promise<Annonce> {
        return await this.annonceRepo.save(createAnnonceDto);
    }

    async updateAnnonce(id: number, createAnnonceDto: CreateAnnonceDto) {
        const annonce = this.findAnnonce(createAnnonceDto.id);
        if (annonce === undefined) {
            throw new NotFoundException('Aucune annonce ne correspond');
        }
        return await this.annonceRepo.update(id, createAnnonceDto);
    }

    async deleteAnnonce(id: number) {
        return await this.annonceRepo.delete(id);
    }

    private async findAnnonce(id: number): Promise<Annonce> {
        const annonce = await this.annonceRepo.findOne({ where: { id } });
        if (!annonce) {
            throw new NotFoundException('Aucune annonce ne correspond');
        }
        return annonce;
    }
}
