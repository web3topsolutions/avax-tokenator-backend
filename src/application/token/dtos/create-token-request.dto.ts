import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateTokenRequest {
  @ApiProperty({ example: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', description: 'Owner address' })
  @IsNotEmpty({ message: 'Owner address cannot be empty.' })
  @IsString()
  ownerAddress: string;

  @ApiProperty({ example: 'RCH Token', description: 'Token name' })
  @IsNotEmpty({ message: 'Token name cannot be empty.' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'RHCT', description: 'Token symbol' })
  @IsNotEmpty({ message: 'The token symbol cannot be empty.' })
  @IsString()
  symbol: string;

  @ApiProperty({ example: 1000000, description: 'Initial supply of tokens to be created' })
  @IsNotEmpty({ message: 'The initial supply cannot be empty.' })
  @IsNumber({}, { message: 'The initial supply must be a number.' })
  @Min(1, { message: 'The initial supply must be at least 1.' })
  initialSupply: number;

  @ApiProperty({ example: 18, description: 'Initial amount of tokens to be created' })
  @IsNotEmpty({ message: 'The decimal cannot be empty.' })
  @IsNumber({}, { message: 'The decimal must be a number.' })
  @Min(1, { message: 'The decimal must be at least 1.' })
  decimals: number;

  @ApiProperty({ example: true, description: 'Whether the token is burnable or not', required: false, default: false })
  @IsOptional()
  @IsBoolean({ message: 'The burnable must be a boolean.' })
  burnable: boolean = false;

  @ApiProperty({ example: true, description: 'Whether the token is mintable or not', required: false, default: false })
  @IsOptional()
  @IsBoolean({ message: 'The mintable must be a boolean.' })
  mintable: boolean = false;

  @ApiProperty({ example: true, description: 'Whether or not the token source code will be verified', required: false, default: false })
  @IsOptional()
  @IsBoolean({ message: 'The verified must be a boolean.' })
  verified: boolean = false;
}
