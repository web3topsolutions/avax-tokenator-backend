import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TokenModule } from './token.module'; // Import the TokenModule
import { AppConfigModule } from '../modules/config.module'

//import { AppController } from './app.controller';
//import { AppService } from './app.service';

@Module({
  imports : [
    CqrsModule,
    TokenModule,
    AppConfigModule
  ]
})
export class AppModule {}
