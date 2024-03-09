import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    Object.assign(user, { ...createUserDto });
    await this.prisma.user.create({ data: { ...user } });

    return plainToInstance(User, user);
  }

  async findAll() {
    const allUsers = await this.prisma.user.findMany({
      orderBy: { id: 'asc' },
    });
    return plainToInstance(User, allUsers);
  }

  async findOne(id: number) {
    const foundUser = await this.prisma.user.findUnique({ where: { id } });
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }

    return plainToInstance(User, foundUser);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const foundUser = await this.prisma.user.findUnique({ where: { id } });
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { ...updateUserDto },
    });
    return plainToInstance(User, updatedUser);
  }

  async remove(id: number) {
    const foundUser = await this.prisma.user.findUnique({ where: { id } });
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    return await this.prisma.user.delete({ where: { id } });
  }
}
