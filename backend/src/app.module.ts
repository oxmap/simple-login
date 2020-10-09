import { Module, MiddlewareConsumer } from '@nestjs/common';
import { CompressionMiddleware } from '@nest-middlewares/compression';
import { MongoRepoModule } from 'mongo-nest';
import { AppController } from 'app.controller';
import { mongoUrl } from '../../config';
import { UserService } from 'services/user.service';

@Module({
    imports: [MongoRepoModule.forRoot(mongoUrl)],
    providers: [UserService],
    controllers: [AppController],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(CompressionMiddleware).forRoutes('*');
    }
}
