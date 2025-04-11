// tokens/controllers/tokens.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiCreatedResponse, ApiBody } from '@nestjs/swagger';    
import { CreateTokenDto } from '../../Services/Tokens/Dtos/create-token.dto';
import { CreateTokenCommand } from '../../Services/Tokens/UseCases/Commands/Impl/create-token.command';
//import { GetTokenBySymbolQuery } from '../queries/impl/get-token-by-symbol.query';

@ApiTags('tokens')
@Controller('tokens')
export class TokensController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiCreatedResponse({ description: 'Token criado com sucesso' })
  @ApiBody({ type: CreateTokenDto })
  async createToken(@Body() body: CreateTokenDto) {

    return await this.commandBus.execute(
      new CreateTokenCommand(
        body.name, 
        body.symbol, 
        body.decimals, 
        body.supply, 
        body.description, 
        body.image),
    );
  }

  /*
  @Get(':symbol')
  async getBySymbol(@Param('symbol') symbol: string) {
    return await this.queryBus.execute(new GetTokenBySymbolQuery(symbol));
  }
  */
}
