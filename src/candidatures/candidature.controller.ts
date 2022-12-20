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
import { CreateCandidatureDto } from './createCandidature.dto';
import { CandidaturesService } from './candidature.service';

@Controller('candidatures')
export class CandidaturesController {
    constructor(private readonly annonceService: CandidaturesService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async addCandidature(@Body() createAnnonceDto: CreateCandidatureDto) {
        return await this.annonceService.addCandidature(createAnnonceDto);
    }

    @Get()
    async getCandidatures() {
        return await this.annonceService.getCandidatures();
    }

    @Get(':id')
    async getAnnonce(@Param('id', ParseIntPipe) id: number) {
        return await this.annonceService.getCandidature(id);
    }

    @Patch(':id')
    @UsePipes(ValidationPipe)
    async updateAnnonce(
        @Param('id') id: number,
        @Body() createCandidatureDto: CreateCandidatureDto,
    ) {
        return await this.annonceService.updateCandidature(
            id,
            createCandidatureDto,
        );
    }

    @Delete(':id')
    async deleteAnnonce(@Param('id') id: number) {
        return await this.annonceService.deleteCandidature(id);
    }
}
