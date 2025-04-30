import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  createTokenAsync(): string {
    return 'Token created successfully!';
  }
}


