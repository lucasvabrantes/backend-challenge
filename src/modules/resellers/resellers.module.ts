import { Module } from '@nestjs/common';
import { ResellersService } from './resellers.service';
import { ResellersController } from './resellers.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [ResellersController],
  providers: [ResellersService, PrismaService],
})
export class ResellersModule {}
