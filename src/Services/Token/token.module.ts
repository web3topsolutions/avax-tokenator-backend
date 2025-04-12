// tokens/token.module.ts
import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TokenController } from '../../Presentation/Controllers/token.controller';
import { CreateTokenHandler } from './UseCases/Commands/create-token.handler';
import { SolanaService } from '../solana.service';
//import { GetTokenBySymbolHandler } from './queries/handlers/get-token-by-symbol.handler';
//import { TokenRepository } from './repositories/token.repository';

@Module({
  imports: [CqrsModule],
  controllers: [TokenController],
  providers: [
    SolanaService,
    //TokenRepository,
    CreateTokenHandler,
    //GetTokenBySymbolHandler,
    Logger
  ],
})
export class TokenModule {}
