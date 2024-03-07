import { Module } from '@nestjs/common';
import { StoreOwnersService } from './store-owners.service';
import { StoreOwnersController } from './store-owners.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [StoreOwnersController],
  providers: [StoreOwnersService, PrismaService],
})
export class StoreOwnersModule {}
