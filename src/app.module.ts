import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TokenModule } from './Services/Token/token.module'; // Import the TokenModule

//import { AppController } from './app.controller';
//import { AppService } from './app.service';

@Module({
  imports : [
    CqrsModule,
    TokenModule, // Register the TokenModule here
  ] // CqrsModule.forRoot() is used to initialize the CQRS module
  
  //imports: [],
  //controllers: [AppController],
  //providers: [AppService],
})
export class AppModule {}
