// tokens/commands/handlers/create-token.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTokenCommand } from './create-token.command';
import { ITokenService } from '../../interfaces/itoken.service';
import { CreateTokenResponse } from '../../dtos/create-token-response.dto';
import { Logger, Inject } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

@CommandHandler(CreateTokenCommand)
export class CreateTokenHandler implements ICommandHandler<CreateTokenCommand> {
  
  constructor(
    private readonly logger: Logger,
    @Inject('IBaseService')
    private readonly baseService: ITokenService
  ) {}

  async execute(command: CreateTokenCommand): Promise<CreateTokenResponse> {
    this.logger.log('Executing CreateTokenCommand with data:', command);
    const tokenData = await this.baseService.createToken(command);

    this.logger.log('Token created successfully:', tokenData);
    return plainToClass(CreateTokenResponse, tokenData);
  }
}