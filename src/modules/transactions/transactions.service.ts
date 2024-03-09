import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const sender = await this.prisma.user.findUnique({
      where: { id: createTransactionDto.sender },
    });

    const receiver = await this.prisma.user.findUnique({
      where: { id: createTransactionDto.receiver },
    });
    const { amount } = createTransactionDto;

    if (sender.balance < amount) {
      throw new ForbiddenException(
        'Your balance is not enough to make this transaction',
      );
    }

    if (sender.id === receiver.id) {
      throw new ForbiddenException('You cannot make a transaction to yourself');
    }

    const newSenderBalance: number = Number(
      (sender.balance - amount).toFixed(2),
    );
    const newReceiverBalance: number = Number(
      (receiver.balance + amount).toFixed(2),
    );

    await this.prisma.user.update({
      where: { id: sender.id },
      data: { ...sender, balance: newSenderBalance },
    });

    await this.prisma.user.update({
      where: { id: receiver.id },
      data: { ...receiver, balance: newReceiverBalance },
    });

    const transaction = new Transaction();
    Object.assign(transaction, { ...createTransactionDto });
    const newTransaction = await this.prisma.transaction.create({
      data: { ...transaction },
    });

    return {
      message: `${amount} was sent with success to ${receiver.fullName}!`,
    };
  }

  async findAll() {
    return await this.prisma.transaction.findMany({ orderBy: { id: 'asc' } });
  }

  async findOne(id: number) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
    });
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    return transaction;
  }
}
