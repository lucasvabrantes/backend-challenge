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

@Module({
  imports: [UsersModule, TransactionsModule],
  providers: [PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserExists)
      .forRoutes({ path: 'users', method: RequestMethod.POST });
  }
}
