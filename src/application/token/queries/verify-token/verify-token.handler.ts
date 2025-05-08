import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { VerifyTokenQuery } from './verify-token.query';
import { VerifyTokenResponse } from '../../dtos/verify-token-response.dto';
import { createPublicClient, http } from 'viem';
import { anvil, mainnet } from 'viem/chains';

@QueryHandler(VerifyTokenQuery)
export class VerifyTokenHandler implements IQueryHandler<VerifyTokenQuery> {
  async execute(query: VerifyTokenQuery): Promise<VerifyTokenResponse> {
    const { tokenAddress } = query;   

    const client = createPublicClient({
      chain: anvil,
      transport: http(), // ou configure o endpoint do seu nó / provedor
    });

    try {
      //console.log('Verifying token at address:', tokenAddress);
      
      const code = await client.getCode({ 
        address: tokenAddress.startsWith('0x') ? tokenAddress as `0x${string}` : `0x${tokenAddress}` as `0x${string}` 
      });

      //console.log('Code: ', code);

      if (code && code !== '0x') {
        return { isVerified: true, message: 'Token contract exists at this address.' };
      } else {
        return { isVerified: false, message: 'No contract found at this address.' };
      }
    } catch (error) {
      //console.error('Error verifying token:', error);      
      return { isVerified: false, message: `Error verifying token: ${error.message}` };
    }
  }
}
