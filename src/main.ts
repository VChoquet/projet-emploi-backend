import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
    await app.listen(process.env.SERVER_PORT);
    app.useGlobalPipes(
        new ValidationPipe({
            forbidUnknownValues: false,
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );
}
bootstrap();
