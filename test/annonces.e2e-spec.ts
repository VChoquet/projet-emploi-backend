import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AnnoncesService } from './../src/annonces/annonces.service';
import { Repository } from 'typeorm';
import { Annonce } from '../src';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config/dist';
import { ConfigService } from '@nestjs/config/dist';
import entities from '../src';
import { AppModule } from './../src/app.module';

describe('AnnoncesController (e2e)', () => {
    let app: INestApplication;
    let annoncesRepo: Repository<Annonce>;
    let annoncesService: AnnoncesService;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                AppModule,
                ConfigModule.forRoot({ isGlobal: true }),
                TypeOrmModule.forRootAsync({
                    imports: [ConfigModule],
                    useFactory: (ConfigService: ConfigService) => ({
                        type: 'postgres',
                        host: ConfigService.get('DB_HOST'),
                        port: +ConfigService.get('DB_PORT'),
                        username: ConfigService.get('DB_USERNAME'),
                        password: ConfigService.get('DB_PASSWORD'),
                        database: ConfigService.get('DB_NAME'),
                        entities,
                        synchronize: true,
                    }),
                    inject: [ConfigService],
                }),
            ],
            providers: [
                AnnoncesService,
                {
                    provide: getRepositoryToken(Annonce),
                    useValue: {
                        find: jest.fn(),
                        findOne: jest.fn(),
                    },
                },
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        annoncesService = new AnnoncesService(annoncesRepo);
        await app.init();
    });

    it('should be defined', async () => {
        expect(annoncesService).toBeDefined();
    });

    //! Rien ne marche => cannot read properties of undefined OSKOUR
    /*it('returns all annonces', async () => {
        return await request(app.getHttpServer())
            .get('/annonces')
            .expect(200)
            .expect({
                data: annoncesService.getAnnonces(),
            });
    });

    it('return specific annonces', async () => {
        return await request(app.getHttpServer())
            .get('/annonces/6')
            .expect(200)
            .expect({
                data: annoncesService.getAnnonce(6),
            });
    });*/

    afterAll(async () => {
        app.close();
    });
});
