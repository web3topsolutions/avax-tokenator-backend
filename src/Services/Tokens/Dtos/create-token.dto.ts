import { ApiProperty } from '@nestjs/swagger';

export class CreateTokenDto {
  @ApiProperty({ example: 'SolanaCoin', description: 'Nome do token' })
  name: string;

  @ApiProperty({ example: 'SOLC', description: 'Símbolo do token' })
  symbol: string;

  @ApiProperty({ example: 9, description: 'Número de casas decimais do token' })
  decimals: number;

  @ApiProperty({ example: 1000000, description: 'Quantidade total de tokens' })
  supply: number;

  @ApiProperty({ example: 'Um token para testes na blockchain Solana' })
  description: string;

  @ApiProperty({ example: 'https://example.com/token.png' })
  image: string;
}
