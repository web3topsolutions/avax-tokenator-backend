import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUrl, MaxLength, Min } from 'class-validator';

export class CreateTokenRequestDto {
  @ApiProperty({ example: 'Solana Coin', description: 'Nome do token' })
  @IsNotEmpty({ message: 'O nome do token não pode estar vazio.' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'SOLC', description: 'Símbolo do token' })
  @IsNotEmpty({ message: 'O símbolo do token não pode estar vazio.' })
  @IsString()
  symbol: string;

  @ApiProperty({ example: 9, description: 'Número de casas decimais do token' })
  @IsNotEmpty({ message: 'O número de casas decimais não pode estar vazio.' })
  @IsNumber({}, { message: 'O número de casas decimais deve ser um número.' })
  @Min(0, { message: 'O número de casas decimais não pode ser negativo.' })
  decimals: number;

  @ApiProperty({ example: 1000000, description: 'Quantidade inicial de tokens a serem criados' })
  @IsNotEmpty({ message: 'O supply inicial não pode estar vazio.' })
  @IsNumber({}, { message: 'O supply inicial deve ser um número.' })
  @Min(1, { message: 'O supply inicial deve ser pelo menos 1.' })
  supply: number;

  @ApiProperty({ example: 'Um token para testes na blockchain Solana', description: 'Descrição do token', required: false })
  @IsString()
  description?: string;

  @ApiProperty({ example: 'https://example.com/token.png', description: 'URL da imagem do token', required: false })
  @IsUrl({}, { message: 'A URL da imagem deve ser uma URL válida.' })
  image?: string;
}
