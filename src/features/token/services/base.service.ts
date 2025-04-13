// tokens/services/solana.service.ts
import { Injectable } from '@nestjs/common';
import { CreateTokenResponse } from '../domain/modules/crete-token-response';
import { CreateTokenRequest } from '../domain/modules/create-token-request';
import { IBaseService } from './ibase.service';
@Injectable()
export class BaseService implements IBaseService {
  // This service will handle the creation of tokens on the Base network
  async createToken(data: CreateTokenRequest): Promise<CreateTokenResponse> {
    // Here you would integrate with the Base network via a library or API
    console.log('Creating Token on Base', data);

    // Mocked response
    return new CreateTokenResponse(
      "3emsAVdmGKERbHjmGfQ6oZ1e35dkf5iYcS6U4CPKFVaa",
      100000,
      "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
    );
  }
}

