import { ConflictException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UserExists implements NestMiddleware {
  constructor(private prisma: PrismaService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const findUserByEmail = await this.prisma.user.findFirst({
      where: { email: req.body.email },
    });

    const findUserByCpf = await this.prisma.user.findFirst({
      where: { cpf: req.body.cpf },
    });

    if (findUserByEmail || findUserByCpf) {
      throw new ConflictException('User already exists');
    }

    next();
  }
}
