import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTokenResponse {
  @ApiProperty({ example: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8', description: 'Owner wallet address' })
  ownerAddress: string;
  @ApiProperty({ example: '0x5FbDB2315678afecb367f032d93F642f64180aa3', description: 'Token address' })
  tokenAddress: string;
  @ApiProperty({ example: 'Rio Crypto Hub token', description: 'Name of the token' })
  name: string;
  @ApiProperty({ example: 'RCHT', description: 'Symbol of the token' })
  symbol: string;
  @ApiProperty({ example: 10000, description: 'Initial supply of the tokens' })
  initialSupply: number;
  @ApiProperty({ example: 18, description: 'Decimal places of the token' })
  decimal: string;
  @ApiProperty({ example: true, description: 'Whether the token is burnable or not' })
  burnable: boolean;
  @ApiProperty({ example: true, description: 'Whether the token is mintable or not' })
  mintable: boolean;
  @ApiProperty({ example: true, description: 'Whether or not the token source code will be verified' })
  verified: boolean;
}