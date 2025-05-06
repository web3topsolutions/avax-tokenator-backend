import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get rpcUrl(): string {
    return this.configService.get<string>('RPC_URL')!;
  }

  get chain(): string {
    return this.configService.get<string>('CHAIN')!;
  }

  get privateKey(): `0x${string}` {
    const key = this.configService.get<string>('PRIVATE_KEY')!;
    return key as `0x${string}`;
  }

  get contractAddress(): `0x${string}` {
    const address = this.configService.get<string>('CONTRACT_ADDRESS')!;
    return address as `0x${string}`;
  }
}