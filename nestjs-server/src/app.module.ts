import { Module } from '@nestjs/common';
import { IS_DEV_ENV } from './libs/common/utils/is-dev.util';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { ProviderModule } from './auth/provider/provider.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: !IS_DEV_ENV,
      isGlobal: true,
      expandVariables: true
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    ProviderModule
  ],
  providers: [PrismaService]
})
export class AppModule {}
