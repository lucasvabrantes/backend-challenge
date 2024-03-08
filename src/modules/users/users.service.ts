import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { User } from './entities/user.entity';
// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    Object.assign(user, { ...createUserDto });
    const newUser = await this.prisma.user.create({ data: { ...user } });

    return newUser;
  }

  // async findAll() {
  //   return `This action returns all resellers`;
  // }

  // async findOne(id: number) {
  //   return `This action returns a #${id} reseller`;
  // }

  // async update(id: number, updateResellerDto: UpdateUserDto) {
  //   return `This action updates a #${id} reseller`;
  // }

  // async remove(id: number) {
  //   return `This action removes a #${id} reseller`;
  // }
}
