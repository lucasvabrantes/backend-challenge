import { ConflictException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UserExists implements NestMiddleware {
  constructor(private prisma: PrismaService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const findResellerByEmail = await this.prisma.reseller.findFirst({
      where: { email: req.body.email },
    });

    const findResellerByCpf = await this.prisma.reseller.findFirst({
      where: { cpf: req.body.cpf },
    });

    const findStoreOwnerByEmail = await this.prisma.storeOwner.findFirst({
      where: { email: req.body.email },
    });

    const findStoreOwnerByCpf = await this.prisma.storeOwner.findFirst({
      where: { cpf: req.body.cpf },
    });

    if (
      findStoreOwnerByEmail ||
      findStoreOwnerByCpf ||
      findResellerByEmail ||
      findResellerByCpf
    ) {
      throw new ConflictException('User already exists');
    }

    next();
  }
}
