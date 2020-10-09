import { Module, MiddlewareConsumer } from '@nestjs/common';
import { CompressionMiddleware } from '@nest-middlewares/compression';
import { MongoRepoModule } from 'mongo-nest';
import { AppController } from 'app.controller';
import { mongoUrl } from '../../config';

@Module({
    imports: [MongoRepoModule.forRoot(mongoUrl)],
    controllers: [AppController],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(CompressionMiddleware).forRoutes('*');
    }
}
