// tokens/services/solana.service.ts
import { Injectable } from '@nestjs/common';
import { Token } from '../../domain/token/entities/token.entity';
import { CreateTokenRequest } from '../../application/token/dtos/create-token-request.dto';
import { ITokenService } from '../../application/token/interfaces/itoken.service';

@Injectable()
export class TokenService implements ITokenService {
  // This service will handle the creation of tokens on the Avalanche network
  async createToken(data: CreateTokenRequest): Promise<Token> {
    // Here you would integrate with the Avalanche network via a library or API
    console.log('Creating Token on Avalanche', data);

    // Mocked response
    return new Token(
      "RCHToken",
      "RCHT",
      9,
      10000,
      "Token do Rio Crypto Hub",
      "https://rcht.jpg"
    );
  }
}

