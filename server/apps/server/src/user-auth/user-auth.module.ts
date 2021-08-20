import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserAuthController } from './user-auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    PassportModule
  ],
  controllers: [UserAuthController],
  providers: [LocalStrategy,JwtStrategy]
})
export class UserAuthModule {}
