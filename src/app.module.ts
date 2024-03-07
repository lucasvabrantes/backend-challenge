import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ResellersModule } from './modules/resellers/resellers.module';
import { StoreOwnersModule } from './modules/store-owners/store-owners.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { UserExists } from './middlewares/userExists.middleware';
import { PrismaService } from './database/prisma.service';

@Module({
  imports: [ResellersModule, StoreOwnersModule, TransactionsModule],
  providers: [PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserExists).forRoutes(
      { path: 'resellers', method: RequestMethod.POST },
      // { path: 'storeowners', method: RequestMethod.POST },
    );
  }
}
