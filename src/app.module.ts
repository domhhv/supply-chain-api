import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupplyChainModule } from './supply-chain/supply-chain.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.env.production'
          : '.env.development',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        if (process.env.NODE_ENV === 'production') {
          return {
            type: 'postgres',
            url: configService.get<string>('DATABASE_URL'),
            synchronize: false,
            autoLoadEntities: true,
          };
        }
        return {
          type: 'postgres',
          host: configService.get<string>('PGHOST'),
          port: configService.get<number>('PGPORT'),
          username: configService.get<string>('PGUSER'),
          password: configService.get<string>('PGPASSWORD'),
          database: configService.get<string>('PGDATABASE'),
          synchronize: true,
          autoLoadEntities: true,
        };
      },
      inject: [ConfigService],
    }),
    SupplyChainModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
