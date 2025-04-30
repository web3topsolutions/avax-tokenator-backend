// tokens/token.module.ts
import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TokenController } from '../presentation/controllers/token.controller';
import { CreateTokenHandler } from '../application/token/commands/create-token/create-token.handler';
import { TokenService } from '../infrastructure/services/token.service';
//import { GetTokenBySymbolHandler } from './queries/handlers/get-token-by-symbol.handler';
//import { TokenRepository } from './repositories/token.repository';

@Module({
  imports: [CqrsModule],
  controllers: [TokenController],
  providers: [
    TokenService,
    {
      provide: 'IBaseService',
      useClass: TokenService,
    },
    //TokenRepository,
    CreateTokenHandler,
    //GetTokenBySymbolHandler,
    Logger
  ],
})
export class TokenModule {}
