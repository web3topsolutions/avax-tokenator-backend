// tokens/controllers/tokens.controller.ts
import { Body, Controller,  HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
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
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'Token created successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid parameters' })
  @ApiOperation({ 
    summary: 'Creates a new token', 
    description: 'This endpoint creates a new token with the information provided in the request body.'
  })
  @ApiBody({ type: CreateTokenRequest })
  async createToken(@Body() request: CreateTokenRequest) {

    const createTokenCommand = plainToClass(CreateTokenCommand, request);

    const createTokenResponse = await this.commandBus.execute<CreateTokenCommand, CreateTokenResponse>(createTokenCommand);

    return createTokenResponse;
  }
}
