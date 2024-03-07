import { ConflictException, Injectable } from '@nestjs/common';
import { CreateResellerDto } from './dto/create-reseller.dto';
import { UpdateResellerDto } from './dto/update-reseller.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Reseller } from './entities/reseller.entity';

@Injectable()
export class ResellersService {
  constructor(private prisma: PrismaService) {}

  async create(createResellerDto: CreateResellerDto) {
    const reseller = new Reseller();
    Object.assign(reseller, { ...createResellerDto });
    return await this.prisma.reseller.create({ data: { ...reseller } });
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
