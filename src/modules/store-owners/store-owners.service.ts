import { Injectable } from '@nestjs/common';
import { CreateStoreOwnerDto } from './dto/create-store-owner.dto';
import { UpdateStoreOwnerDto } from './dto/update-store-owner.dto';

@Injectable()
export class StoreOwnersService {
  create(createStoreOwnerDto: CreateStoreOwnerDto) {
    return 'This action adds a new storeOwner';
  }

  findAll() {
    return `This action returns all storeOwners`;
  }

  findOne(id: number) {
    return `This action returns a #${id} storeOwner`;
  }

  update(id: number, updateStoreOwnerDto: UpdateStoreOwnerDto) {
    return `This action updates a #${id} storeOwner`;
  }

  remove(id: number) {
    return `This action removes a #${id} storeOwner`;
  }
}
