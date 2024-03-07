import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class CreateStoreOwnerDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @Length(11, 11, { message: 'Cpf precisa ter 11 caracteres' })
  cpf: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  balance: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
