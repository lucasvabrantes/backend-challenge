import { Module } from '@nestjs/common';
import { ResellersModule } from './modules/resellers/resellers.module';
import { StoreOwnersModule } from './modules/store-owners/store-owners.module';
import { TransactionsModule } from './modules/transactions/transactions.module';

@Module({
  imports: [ResellersModule, StoreOwnersModule, TransactionsModule],
})
export class AppModule {}
