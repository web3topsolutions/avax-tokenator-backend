// tokens/services/solana.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { Token } from '../../domain/token/entities/token.entity';
import { CreateTokenCommand } from '../../application/token/commands/create-token/create-token.command';
import { ITokenService } from '../../application/token/interfaces/itoken.service';
import { AppConfigService } from 'src/shared/config/config.service';

import { createPublicClient, http, createWalletClient, type WalletClient, decodeEventLog, 
  type TransactionReceipt, type PublicClient } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { anvil } from 'viem/chains';

import CreateTokenAbi from '../../application/token/abis/create-token.abi.json';

@Injectable()
export class TokenService implements ITokenService {
  // This service will handle the creation of tokens on the Avalanche network

  constructor(
    private readonly config: AppConfigService, 
    private readonly logger: Logger
  ) {}
  
  async createToken(request: CreateTokenCommand): Promise<Token> {
    const publicClient = this.createPublicClient();
    const walletClient = this.createWalletClient();

    try {
      this.logger.log('[CreateTokenHandler] Deploying token contract...');
      this.logger.debug('[CreateTokenHandler] Using ABI:', JSON.stringify(CreateTokenAbi.abi, null, 2));
      const transactionHash = await this.deployToken(walletClient, request);

      this.logger.log('[CreateTokenHandler] Waiting for transaction receipt...');
      const receipt = await this.getTransactionReceipt(publicClient, transactionHash);

      this.logger.log('[CreateTokenHandler] Decoding transaction receipt...');
      const decodedLog = this.decodeTokenCreatedEvent(receipt);

      return new Token(
        request.ownerAddress,
        decodedLog.args && 'tokenAddress' in decodedLog.args ? String(decodedLog.args.tokenAddress) : '',
        request.name,
        request.symbol,
        request.initialSupply,
        request.decimals
      );

    } catch (error) {
      this.logger.error('[CreateTokenHandler] Error creating token:', error.stack);
      throw new Error('Failed to create token');
    }
  }

  private createPublicClient() {
    return createPublicClient({
      chain: anvil,
      transport: http()
    });
  }

  private createWalletClient() {
    const account = privateKeyToAccount(this.config.privateKey);
    return createWalletClient({
      account,
      transport: http(this.config.rpcUrl)
    });
  }

  private async deployToken(walletClient: WalletClient, request: CreateTokenCommand) {
    return await walletClient.writeContract({
      address: this.config.contractAddress,
      abi: CreateTokenAbi.abi,
      functionName: 'createToken',
      args: [request.ownerAddress, BigInt(request.initialSupply), request.name, request.symbol],
      chain: anvil,
      account: privateKeyToAccount(this.config.privateKey)
    });
  }

  private decodeTokenCreatedEvent(receipt: TransactionReceipt) {
    try{
    const decodedLog = decodeEventLog({
      abi: CreateTokenAbi.abi,
      data: receipt.logs[2].data,
      topics: receipt.logs[2].topics,
      strict: false
    });

    if (!decodedLog?.args || typeof decodedLog.args !== 'object') {
      this.logger.error('[CreateTokenHandler] Failed to decode event log or missing arguments');
      throw new Error('Failed to decode event log or missing arguments');
    }

    return decodedLog;
    } catch (error) {
      console.error('[CreateTokenHandler] Erro ao obter o receipt da transação:', error.stack);
      throw new Error('Failed to decode event log or missing arguments');
    }
  }

  private async getTransactionReceipt(publicClient: PublicClient, hash: `0x${string}`) {
    const receipt = await publicClient.waitForTransactionReceipt({
      hash,
      confirmations: 1,
    });

    if (!receipt.logs?.length) {
      this.logger.error('[CreateTokenHandler] No logs found in transaction receipt');
      throw new Error('No logs found in transaction receipt');
    }

    return receipt;
  }
}