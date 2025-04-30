import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUrl, MaxLength, Min } from 'class-validator';

export class CreateTokenRequest {
  @ApiProperty({ example: 'RCH Token', description: 'Token name' })
  @IsNotEmpty({ message: 'Token name cannot be empty.' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'RHCT', description: 'Token symbol' })
  @IsNotEmpty({ message: 'The token symbol cannot be empty.' })
  @IsString()
  symbol: string;

  @ApiProperty({ example: 9, description: 'Number of decimal places in the token' })
  @IsNotEmpty({ message: 'The number of decimal places cannot be empty.' })
  @IsNumber({}, { message: 'The number of decimal places must be an integer.' })
  @Min(0, { message: 'The number of decimal places cannot be negative.' })
  decimals: number;

  @ApiProperty({ example: 1000000, description: 'Initial amount of tokens to be created' })
  @IsNotEmpty({ message: 'The initial supply cannot be empty.' })
  @IsNumber({}, { message: 'The initial supply must be a number.' })
  @Min(1, { message: 'The initial supply must be at least 1.' })
  supply: number;

  @ApiProperty({ example: 'A token for testing on the Avalanche blockchain', description: 'Token description', required: false })
  @IsString()
  description?: string;

  @ApiProperty({ example: 'https://example.com/token.png', description: 'Token Image URL', required: false })
  @IsUrl({}, { message: 'The image URL must be a valid URL.' })
  image?: string;
}
