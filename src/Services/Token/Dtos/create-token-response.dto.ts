import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTokenResponseDto {
  @ApiProperty({ example: 'TokenAccount123', description: 'Conta do token' })
  tokenAccount: string;
  @ApiProperty({ example: 1000, description: 'Quantidade de tokens' })
  amount: number;
  @ApiProperty({ example: 'Destination123', description: 'Destino do token' })
  destination: string;
}