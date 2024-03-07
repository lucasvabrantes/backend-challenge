import { ConflictException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UserExists implements NestMiddleware {
  constructor(private prisma: PrismaService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const findReseller = await this.prisma.reseller.findFirst({
      where: { email: req.body.email },
    });

    if (findReseller) {
      throw new ConflictException('User already exists');
    }

    const findStoreOwner = await this.prisma.storeOwner.findFirst({
      where: { cpf: req.body.cpf },
    });

    if (findStoreOwner) {
      throw new ConflictException('User already exists');
    }

    next();
  }
}
