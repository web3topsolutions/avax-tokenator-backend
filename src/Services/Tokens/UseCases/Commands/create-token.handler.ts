// tokens/commands/handlers/create-token.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTokenCommand } from './Impl/create-token.command';
import { SolanaService } from '../../../solana.service';

@CommandHandler(CreateTokenCommand)
export class CreateTokenHandler implements ICommandHandler<CreateTokenCommand> {
  constructor(private readonly solanaService: SolanaService) {}

  async execute(command: CreateTokenCommand): Promise<any> {
    const { name, symbol, decimals, supply, description, image } = command;

    // Chamada à lógica da Solana
    const tokenData = await this.solanaService.createToken({
      name,
      symbol,
      decimals,
      supply,
      description,
      image,
    });

    return tokenData;
  }
}
