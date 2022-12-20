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

@Controller('annonces')
export class AnnoncesController {
    constructor(private readonly annonceService: AnnoncesService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async addAnnonce(@Body() createAnnonceDto: CreateAnnonceDto) {
        return await this.annonceService.addAnnonce(createAnnonceDto);
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
    async updateAnnonce(
        @Param('id') id: number,
        @Body() createAnnonceDto: CreateAnnonceDto,
    ) {
        return await this.annonceService.updateAnnonce(id, createAnnonceDto);
    }

    @Delete(':id')
    async deleteAnnonce(@Param('id') id: number) {
        return await this.annonceService.deleteAnnonce(id);
    }
}
