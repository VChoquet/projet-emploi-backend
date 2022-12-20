import { Module } from '@nestjs/common';
import { CandidaturesController } from './candidature.controller';
import { CandidaturesService } from './candidature.service';
import { Candidature } from './candidature.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Candidature])],
    controllers: [CandidaturesController],
    providers: [CandidaturesService],
})
export class CandidaturesModule {}
