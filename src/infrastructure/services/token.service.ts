// tokens/services/solana.service.ts
import { Injectable } from '@nestjs/common';
import { Token } from '../../domain/token/entities/token.entity';
import { CreateTokenRequest } from '../../application/token/dtos/create-token-request.dto';
import { ITokenService } from '../../application/token/interfaces/itoken.service';
import { AppConfigService } from 'src/shared/config/config.service';
import { createPublicClient, http, type Client, createWalletClient, type WalletClient, decodeEventLog } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { anvil } from 'viem/chains';
import CreateTokenAbi from '../../application/token/abis/create-token.abi.json';

@Injectable()
export class TokenService implements ITokenService {
  // This service will handle the creation of tokens on the Avalanche network
  private readonly config: AppConfigService
  private walletClient: WalletClient;
  
  async createToken(request: CreateTokenRequest): Promise<Token> {
    // Here you would integrate with the Avalanche network via a library or API
    console.log('Creating Token on Avalanche', request);

    const publicClient = createPublicClient({
      chain: anvil,
      transport: http()
    });
    const account = privateKeyToAccount(this.config.privateKey);
    this.walletClient = createWalletClient({
      account,
      transport: http(this.config.rpcUrl)
    });

    // Here you would create the token using the Avalanche SDK or API
    // For example, using the Viem library to create a token
    const token = await this.walletClient.writeContract({
      address: this.config.contractAddress,
      abi: CreateTokenAbi.abi,
      functionName: 'createToken',
      args: [request.name, request.symbol, request.decimals, request.supply],
      chain: anvil,
      account: account,     // Wallet account to use
    });

    const receipt = await publicClient.waitForTransactionReceipt({
      hash: token,
      confirmations: 1,
    });
    
    // Decodifica o evento TokenCreated do receipt
    const {
      args: { tokenAddress, owner, initialSupply },
    } = decodeEventLog({
      abi: CreateTokenAbi.abi,
      data: receipt.logs[0].data,
      topics: receipt.logs[0].topics,
    });

    // Retorna novo token com o endereço obtido do evento
    return new Token(
      tokenAddress, // endereço do token criado retornado pelo evento
      request.name,
      request.symbol,
      request.decimals,
      request.supply,
      request.description || '',
      request.image || ''
    );
  }
}