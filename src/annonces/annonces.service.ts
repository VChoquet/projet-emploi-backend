import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Annonce } from './annonce.entity';
import { CreateAnnonceDto } from './CreateAnnonce.dto';
import { Axios, AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';

@Injectable()
export class AnnoncesService {
    private httpService: HttpService;
    constructor(
        @InjectRepository(Annonce)
        private readonly annonceRepo: Repository<Annonce>,
    ) {
        this.httpService = new HttpService();
    }

    async getAnnonces(): Promise<Annonce[]> {
        return await this.annonceRepo.find({
            order: {
                id: 'DESC',
            },
        });
    }

    async getAnnonce(id: number): Promise<Annonce> {
        return this.findAnnonce(id);
    }

    async addAnnonce(createAnnonceDto: CreateAnnonceDto): Promise<Annonce> {
        const villes = await this.getVilles();
        if (this.existeVille(villes, createAnnonceDto.ville)) {
            return await this.annonceRepo.save(createAnnonceDto);
        } else {
            throw new Error('ville');
        }
    }

    async updateAnnonce(id: number, nb_visite: number) {
        const annonce = await this.findAnnonce(id);
        if (annonce === undefined) {
            throw new NotFoundException('Aucune annonce ne correspond');
        }
        annonce.nb_visite = nb_visite;
        return await this.annonceRepo.save(annonce);
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

    private async getVilles() {
        const resp = await this.httpService.axiosRef.get(
            'https://geo.api.gouv.fr/departements/987/communes',
        );
        return resp.data;
    }

    private existeVille(villes, lieu): boolean {
        const lieuUp = lieu.toUpperCase();
        for (let i = 0; i < villes.length; i++) {
            const villeUp = villes[i].nom.toUpperCase();
            // console.log(villeUp + '_' + lieuUp);
            // console.log(villeUp === lieuUp);
            if (villeUp === lieuUp) {
                return true;
            }
        }
        return false;
    }
}
