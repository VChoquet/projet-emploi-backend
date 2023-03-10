import {
    Controller,
    Post,
    UsePipes,
    ValidationPipe,
    Body,
    Get,
    Patch,
    Delete,
    Param,
    ParseIntPipe,
} from '@nestjs/common';
import { CreateAnnonceDto } from './CreateAnnonce.dto';
import { AnnoncesService } from './annonces.service';

interface updater {
    nb_visite: number;
}

@Controller('annonces')
export class AnnoncesController {
    constructor(private readonly annonceService: AnnoncesService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async addAnnonce(@Body() createAnnonceDto: CreateAnnonceDto) {
        try {
            return await this.annonceService.addAnnonce(createAnnonceDto);
        } catch (error) {
            return error.message;
        }
    }

    @Get()
    async getAnnonces() {
        return await this.annonceService.getAnnonces();
    }

    @Get(':id')
    async getAnnonce(@Param('id', ParseIntPipe) id: number) {
        return await this.annonceService.getAnnonce(id);
    }

    @Patch(':id')
    @UsePipes(ValidationPipe)
    async updateAnnonce(@Param('id') id: number, @Body() body: updater) {
        return await this.annonceService.updateAnnonce(id, body.nb_visite);
    }

    @Delete(':id')
    async deleteAnnonce(@Param('id') id: number) {
        return await this.annonceService.deleteAnnonce(id);
    }
}
