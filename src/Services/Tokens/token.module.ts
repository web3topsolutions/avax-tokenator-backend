// tokens/token.module.ts
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TokensController } from '../../Presentation/Controllers/tokens.controller';
import { CreateTokenHandler } from './UseCases/Commands/create-token.handler';
import { SolanaService } from '../solana.service';
//import { GetTokenBySymbolHandler } from './queries/handlers/get-token-by-symbol.handler';
//import { TokenRepository } from './repositories/token.repository';

@Module({
  imports: [CqrsModule],
  controllers: [TokensController],
  providers: [
    SolanaService,
    //TokenRepository,
    CreateTokenHandler,
    //GetTokenBySymbolHandler,
  ],
})
export class TokenModule {}
