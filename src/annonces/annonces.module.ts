import { Module } from '@nestjs/common';
import { AnnoncesController } from './annonces.controller';
import { AnnoncesService } from './annonces.service';
import { Annonce } from './annonce.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [TypeOrmModule.forFeature([Annonce]), HttpModule],
    controllers: [AnnoncesController],
    providers: [AnnoncesService],
})
export class AnnoncesModule {}
