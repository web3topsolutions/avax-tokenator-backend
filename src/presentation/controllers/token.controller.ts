// tokens/controllers/tokens.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiCreatedResponse, ApiBody } from '@nestjs/swagger';    
import { CreateTokenRequestDto } from '../../features/Token/dtos/create-token-request.dto';
import { CreateTokenCommand } from '../../features/Token/domain/Commands/create-token/create-token.command';
import { plainToClass } from 'class-transformer';
import { CreateTokenResponse } from 'src/features/Token/domain/modules/crete-token-response';
import { CreateTokenResponseDto } from '../../features/Token/dtos/create-token-response.dto';
//import { GetTokenBySymbolQuery } from '../queries/impl/get-token-by-symbol.query';

@ApiTags('token')
@Controller('token')
export class TokenController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiCreatedResponse({ description: 'Token criado com sucesso' })
  @ApiBody({ type: CreateTokenRequestDto })
  async createToken(@Body() request: CreateTokenRequestDto) {

    const createTokenCommand = plainToClass(CreateTokenCommand, request);

    const createTokenResponse = await this.commandBus.execute<CreateTokenCommand, CreateTokenResponse>(createTokenCommand);

    return plainToClass(CreateTokenResponseDto, createTokenResponse);
  }

  /*
  @Get(':symbol')
  async getBySymbol(@Param('symbol') symbol: string) {
    return await this.queryBus.execute(new GetTokenBySymbolQuery(symbol));
  }
  */
}
