// tokens/token.module.ts
import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TokenController } from '../../presentation/controllers/token.controller';
import { CreateTokenHandler } from './domain/Commands/create-token/create-token.handler';
import { BaseService } from './services/base.service';
//import { GetTokenBySymbolHandler } from './queries/handlers/get-token-by-symbol.handler';
//import { TokenRepository } from './repositories/token.repository';

@Module({
  imports: [CqrsModule],
  controllers: [TokenController],
  providers: [
    BaseService,
    {
      provide: 'IBaseService',
      useClass: BaseService,
    },
    //TokenRepository,
    CreateTokenHandler,
    //GetTokenBySymbolHandler,
    Logger
  ],
})
export class TokenModule {}
