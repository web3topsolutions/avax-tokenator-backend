// tokens/commands/handlers/create-token.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTokenCommand } from './Impl/create-token.command';
import { SolanaService } from '../../../solana.service';
import { CreateTokenResponse } from '../../../Token/Modules/crete-token-response';
import { Logger } from '@nestjs/common';

@CommandHandler(CreateTokenCommand)
export class CreateTokenHandler implements ICommandHandler<CreateTokenCommand> {
  
  constructor(
    private readonly logger: Logger,
    private readonly solanaService: SolanaService
  ) {}

  async execute(command: CreateTokenCommand): Promise<CreateTokenResponse> {
    this.logger.log('Executing CreateTokenCommand with data:', command);
    const tokenData = await this.solanaService.createToken(command);

    return tokenData;
  }
}