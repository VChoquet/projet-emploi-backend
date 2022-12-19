import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnnoncesModule } from './annonces/annonces.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        AnnoncesModule,
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'manaoProjectDB',
            entities: ['src/**/**.entity{.ts,.js}'],
            synchronize: true,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
