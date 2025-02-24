import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggerMiddleware } from './common/middlewares/logger.middleware';
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
            synchronize: true,
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
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
}
