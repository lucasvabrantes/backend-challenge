import { ConflictException, Injectable } from '@nestjs/common';
import { CreateResellerDto } from './dto/create-reseller.dto';
import { UpdateResellerDto } from './dto/update-reseller.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ResellersService {
  constructor(private prisma: PrismaService) {}

  async create(createResellerDto: CreateResellerDto) {
    const findReseller = await this.prisma.reseller.findFirst({
      where: { email: createResellerDto.email },
    });

    if (findReseller) {
      throw new ConflictException('User already exists');
    }
  }

  async findAll() {
    return `This action returns all resellers`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} reseller`;
  }

  async update(id: number, updateResellerDto: UpdateResellerDto) {
    return `This action updates a #${id} reseller`;
  }

  async remove(id: number) {
    return `This action removes a #${id} reseller`;
  }
}
