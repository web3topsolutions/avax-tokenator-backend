// tokens/controllers/tokens.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiCreatedResponse, ApiBody } from '@nestjs/swagger';    
import { CreateTokenRequest } from '../../application/token/dtos/create-token-request.dto';
import { CreateTokenCommand } from '../../application/token/commands/create-token/create-token.command';
import { plainToClass } from 'class-transformer';
import { CreateTokenResponse } from '../../application/token/dtos/create-token-response.dto';

@ApiTags('token')
@Controller('token')
export class TokenController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiCreatedResponse({ description: 'Token criado com sucesso' })
  @ApiBody({ type: CreateTokenRequest })
  async createToken(@Body() request: CreateTokenRequest) {

    const createTokenCommand = plainToClass(CreateTokenCommand, request);

    const createTokenResponse = await this.commandBus.execute<CreateTokenCommand, CreateTokenResponse>(createTokenCommand);

    return createTokenResponse;
  }
}
