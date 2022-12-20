import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Candidature } from './candidature.entity';
import { CreateCandidatureDto } from './createCandidature.dto';

@Injectable()
export class CandidaturesService {
    constructor(
        @InjectRepository(Candidature)
        private readonly CandidatureRepo: Repository<Candidature>,
    ) {}

    async getCandidatures(): Promise<Candidature[]> {
        return await this.CandidatureRepo.find();
    }

    async getCandidature(id: number): Promise<Candidature> {
        return this.findCandidature(id);
    }

    async addCandidature(
        createCandidatureDto: CreateCandidatureDto,
    ): Promise<Candidature> {
        return await this.CandidatureRepo.save(createCandidatureDto);
    }

    async updateCandidature(
        id: number,
        createCandidatureDto: CreateCandidatureDto,
    ) {
        const Candidature = await this.findCandidature(createCandidatureDto.id);
        if (Candidature === undefined) {
            throw new NotFoundException('Aucune candidature ne correspond');
        }
        return await this.CandidatureRepo.update(id, Candidature);
    }

    async deleteCandidature(id: number) {
        return await this.CandidatureRepo.delete(id);
    }

    private async findCandidature(id: number): Promise<Candidature> {
        const Candidature = await this.CandidatureRepo.findOne({
            where: { id },
        });
        if (!Candidature) {
            throw new NotFoundException('Aucune candidature ne correspond');
        }
        return Candidature;
    }
}
