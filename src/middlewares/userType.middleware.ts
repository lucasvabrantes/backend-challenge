import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UserType implements NestMiddleware {
  constructor(private prisma: PrismaService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const senderId = req.body.sender;

    const senderType = await this.prisma.user.findUnique({
      where: { id: senderId },
    });

    if (senderType.userType === 'SHOPKEEPER') {
      throw new ForbiddenException('Shopkeeper cannot send money');
    }

    next();
  }
}
