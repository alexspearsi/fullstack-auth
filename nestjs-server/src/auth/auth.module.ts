import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '@/user/user.service';
import { PrismaService } from '@/prisma/prisma.service';
import { GoogleRecaptchaModule } from '@nestlab/google-recaptcha';
import { getRecaptchaConfig } from '@/config/recaptcha.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getProvidersConfig } from '@/config/providers.config';
import { ProviderModule } from './provider/provider.module';

@Module({
  imports: [
    ProviderModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getProvidersConfig,
      inject: [ConfigService]
    }),
    GoogleRecaptchaModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getRecaptchaConfig,
      inject: [ConfigService],
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, PrismaService],
})
export class AuthModule {}
