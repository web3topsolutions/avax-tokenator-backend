// tokens/services/solana.service.ts
import { Injectable } from '@nestjs/common';
import { CreateTokenResponse } from '../domain/modules/crete-token-response';

@Injectable()
export class BaseService {
  async createToken(data: {
    name: string;
    symbol: string;
    decimals: number;
    supply: number;
    description?: string;
    image?: string;
  }): Promise<CreateTokenResponse> {
    // Aqui você integraria com a EVM via biblioteca ou API
    console.log('Creating Token on Base', data);

    // Mocked response
    return new CreateTokenResponse(
      "3emsAVdmGKERbHjmGfQ6oZ1e35dkf5iYcS6U4CPKFVaa",
      100000,
      "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
    );
  }
}

