import { Module } from '@nestjs/common';
import { AnnoncesController } from './annonces.controller';
import { AnnoncesService } from './annonces.service';
import { Annonce } from './annonce.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Annonce])],
    controllers: [AnnoncesController],
    providers: [AnnoncesService],
})
export class AnnoncesModule {}
