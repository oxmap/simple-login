import { Module, MiddlewareConsumer } from '@nestjs/common';
import { CompressionMiddleware } from '@nest-middlewares/compression';
import { MongoRepoModule } from 'mongo-nest';
import { AppController } from 'app.controller';
import { mongoUrl } from '../../config';
import { UserService } from 'services/user.service';
import { AuthMiddleware } from 'middlewares/authorize.middleware';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { join } from 'path';

@Module({
    imports: [MongoRepoModule.forRoot(mongoUrl), ConfigModule.forRoot({
      envFilePath: [join(__dirname, '..', 'env', 'env.local'), join(__dirname, '..', 'env', 'env.prod')]
    })],
    providers: [UserService],
    controllers: [AppController],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(CompressionMiddleware).forRoutes('*');
        consumer.apply(AuthMiddleware).forRoutes('me');
    }
}
