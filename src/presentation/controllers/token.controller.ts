// tokens/controllers/tokens.controller.ts
import { Body, Controller,  HttpCode, HttpStatus, Post, Logger } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiBody, ApiResponse } from '@nestjs/swagger';    
import { CreateTokenRequest } from '../../application/token/dtos/create-token-request.dto';
import { CreateTokenCommand } from '../../application/token/commands/create-token/create-token.command';
import { plainToClass } from 'class-transformer';
import { CreateTokenResponse } from '../../application/token/dtos/create-token-response.dto';

@ApiTags('token')
@Controller({
  path: 'tokens',
  version: '1',
})
export class TokenController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly logger: Logger,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ 
    description: 'Token created successfully',
    type: CreateTokenResponse,
    content: {
      'application/json': {
        example: {
          tokenAddress: '0x1234567890123456789012345678901234567890',
          ownerAddress: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
          name: 'RCH Token',
          symbol: 'RHCT',
          initialSupply: 1000000,
          decimals: 18,
          burnable: false,
          mintable: false,
          verified: false
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Invalid parameters',
    content: {
      'application/json': {
        examples: {
          'Invalid owner address': {
            value: {
              statusCode: 400,
              message: 'Owner address cannot be empty.',
              error: 'Bad Request'
            }
          },
          'Invalid supply': {
            value: {
              statusCode: 400,
              message: 'The initial supply must be at least 1.',
              error: 'Bad Request'
            }
          }
        }
      }
    }
  })
  @ApiOperation({ 
    summary: 'Creates a new ERC-20 token', 
    description: 'This endpoint creates a new ERC-20 token with the information provided in the request body.'
  })
  @ApiBody({ type: CreateTokenRequest })
  async createToken(@Body() request: CreateTokenRequest) {

    this.logger.log('Received request to create token:', request);
    const createTokenCommand = plainToClass(CreateTokenCommand, request);
    const createTokenResponse = await this.commandBus.execute<CreateTokenCommand, CreateTokenResponse>(createTokenCommand);
    return createTokenResponse;
  }
}
