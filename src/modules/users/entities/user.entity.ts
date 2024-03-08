import { Exclude } from 'class-transformer';

export class User {
  readonly id: number;
  fullName: string;
  cpf: string;
  email: string;
  balance: number;
  userType: 'RESELLER' | 'SHOPKEEPER';

  @Exclude()
  password: string;
}
