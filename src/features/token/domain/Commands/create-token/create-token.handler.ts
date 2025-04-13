// tokens/commands/handlers/create-token.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTokenCommand } from './create-token.command';
import { IBaseService } from '../../../services/ibase.service';
import { CreateTokenResponse } from '../../modules/crete-token-response';
import { Logger, Inject } from '@nestjs/common';

@CommandHandler(CreateTokenCommand)
export class CreateTokenHandler implements ICommandHandler<CreateTokenCommand> {
  
  constructor(
    private readonly logger: Logger,
    @Inject('IBaseService')
    private readonly baseService: IBaseService
  ) {}

  async execute(command: CreateTokenCommand): Promise<CreateTokenResponse> {
    this.logger.log('Executing CreateTokenCommand with data:', command);
    const tokenData = await this.baseService.createToken(command);

    this.logger.log('Token created successfully:', tokenData);
    return tokenData;
  }
}