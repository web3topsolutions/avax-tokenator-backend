// tokens/services/solana.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class SolanaService {
  async createToken(data: {
    name: string;
    symbol: string;
    decimals: number;
    supply: number;
    description?: string;
    image?: string;
  }): Promise<any> {
    // Aqui você integraria com a Solana via biblioteca ou API
    console.log('Criando token na Solana com:', data);
    return { success: true, txHash: 'abc123' };
  }
}
