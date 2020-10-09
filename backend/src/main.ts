import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from './pipes/validation.pipe';
import { readFileSync } from 'fs';

import { join } from 'path';
const clientPath = join(__dirname, '../../client/dist');
async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        process.env.NODE_ENV === 'production'
            ? new FastifyAdapter({
                  http2: true,
                  https: {
                      allowHTTP1: true, // fallback support for HTTP1
                      cert: readFileSync(join(__dirname, '../../../localhost.pem')),
                      key: readFileSync(join(__dirname, '../../../localhost-key.pem')),
                  },
              })
            : new FastifyAdapter(),
    );

    // enable cors for static angular site.
    const corsOptions = {
        origin: [
            'https://localhost:4200',
            'http://localhost:4200',
            'http://localhost:3200',
            'http://128.199.41.162:4200'
        ],
        optionsSuccessStatus: 200,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    };

    app.register(require('fastify-cors'), corsOptions);

    // enable cookie for auth.
    app.register(require('fastify-cookie'));

    // validate types and extra
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            forbidUnknownValues: true,
        }),
    );

    if (process.env.NODE_ENV !== 'production') {
      const options = new DocumentBuilder()
        .setTitle('Simple logi API')
        .setDescription('Description')
        .setVersion('1.0')
        .addTag('simple-login')
        .build();

      const document = SwaggerModule.createDocument(app, options);
      SwaggerModule.setup('api', app, document);
    }

    app.useStaticAssets({ root: clientPath });
    await app.listen(3000, '0.0.0.0');
}
bootstrap();
