import { Module } from '@nestjs/common';
import { CommonModule } from 'yes/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    CommonModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
