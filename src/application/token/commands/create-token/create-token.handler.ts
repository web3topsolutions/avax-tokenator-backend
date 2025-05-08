// tokens/commands/handlers/create-token.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTokenCommand } from './create-token.command';
import { ITokenService } from '../../interfaces/itoken.service';
import { CreateTokenResponse } from '../../dtos/create-token-response.dto';
import { Logger, Inject} from '@nestjs/common';
import { plainToClass } from 'class-transformer';

@CommandHandler(CreateTokenCommand)
export class CreateTokenHandler implements ICommandHandler<CreateTokenCommand> {
  
  constructor(
    private readonly logger: Logger,
    @Inject('ITokenService')
    private readonly iTokenService: ITokenService
  ) {}

  async execute(command: CreateTokenCommand): Promise<CreateTokenResponse> {
    this.logger.log('[CreateTokenHandler] Creating Token on Avalanche', command);
    const tokenData = await this.iTokenService.createToken(command);

    this.logger.log('[CreateTokenHandler] Token created successfully:', tokenData.tokenAddress);
    return plainToClass(CreateTokenResponse, tokenData);
  }
}