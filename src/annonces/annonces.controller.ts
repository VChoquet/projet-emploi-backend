import {
    Controller,
    Post,
    UsePipes,
    ValidationPipe,
    Body,
    Get,
    Param,
    ParseIntPipe,
} from '@nestjs/common';
import { CreateAnnonceDto } from './CreateAnnonce.dto';
import { AnnoncesService } from './annonces.service';
import { Annonce } from './annonce.entity';

@Controller('annonces')
export class AnnoncesController {
    constructor(private readonly annonceService: AnnoncesService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async addAnnonce(@Body() annonce: Annonce) {
        return await this.annonceService.addAnnonce(annonce);
    }

    @Get()
    async getAnnonces() {
        return await this.annonceService.getAnnonces();
    }

    @Get(':id')
    async getAnnonce(@Param('id', ParseIntPipe) id: number) {
        return await this.annonceService.getAnnonce(id);
    }
}
