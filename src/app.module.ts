import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { UserExists } from './middlewares/userExists.middleware';
import { PrismaService } from './database/prisma.service';
import { UserType } from './middlewares/userType.middleware';

@Module({
  imports: [UsersModule, TransactionsModule],
  providers: [PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserExists)
      .forRoutes({ path: 'users', method: RequestMethod.POST }),
      consumer
        .apply(UserType)
        .forRoutes({ path: 'transactions', method: RequestMethod.POST });
  }
}
