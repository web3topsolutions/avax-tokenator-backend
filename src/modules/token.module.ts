// tokens/token.module.ts
import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TokenController } from '../presentation/controllers/token.controller';
import { CreateTokenHandler } from '../application/token/commands/create-token/create-token.handler';
import { VerifyTokenHandler } from '../application/token/queries/verify-token/verify-token.handler';
import { TokenService } from '../infrastructure/services/token.service';
import { AppConfigService } from 'src/shared/config/config.service';
 
@Module({
  imports: [CqrsModule],
  controllers: [TokenController],
  providers: [
    TokenService,
    {
      provide: 'ITokenService',
      useClass: TokenService,
    },
    CreateTokenHandler,
    VerifyTokenHandler,
    Logger,
    AppConfigService
  ],
})
export class TokenModule {}
