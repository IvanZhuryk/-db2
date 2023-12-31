import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ProductModule } from './product/product.module';

@Module({
  imports: [PrismaModule, UserModule, ProductModule, AuthModule,ConfigModule.forRoot({isGlobal:true})],
  controllers: [AppController],
  providers: [AppService,
    {
      provide:APP_GUARD,
      useClass:JwtAuthGuard,
    }
  ],
})
export class AppModule {}
