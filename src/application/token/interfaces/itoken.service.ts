import {CreateTokenCommand} from '../commands/create-token/create-token.command';
import { Token } from '../../../domain/token/entities/token.entity';

export interface ITokenService {
  createToken(request: CreateTokenCommand): Promise<Token>;
}