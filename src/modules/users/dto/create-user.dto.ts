import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
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

  @IsNotEmpty()
  @IsString()
  userType: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'É necessário ter ao menos 8 caracteres' })
  password: string;
}
