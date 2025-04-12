// tokens/controllers/tokens.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiCreatedResponse, ApiBody } from '@nestjs/swagger';    
import { CreateTokenRequestDto } from '../../Services/Token/Dtos/create-token-request.dto';
import { CreateTokenCommand } from '../../Services/Token/UseCases/Commands/Impl/create-token.command';
import { plainToClass } from 'class-transformer';
import { CreateTokenResponse } from 'src/Services/Token/Modules/crete-token-response';
import { CreateTokenResponseDto } from '../../Services/Token/Dtos/create-token-response.dto';
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
