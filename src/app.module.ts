import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from './api/api.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [typeorm],
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // @ts-expect-error(ts(2349))
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    ApiModule,
  ],
})
export class AppModule {}
