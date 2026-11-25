import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from './categories/categories.module';
import { PlayersModule } from './players/players.module';

const createMongoOptions = (configService: ConfigService) => {
    const mongoUri = configService.get<string>('DB_CONNECTION');
    if (!mongoUri) {
        throw new Error('DB_CONNECTION is not configured');
    }

    return { uri: mongoUri };
};

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) =>
                createMongoOptions(configService),
        }),
        CategoriesModule,
        PlayersModule,
    ],
    controllers: [AppController],
})
export class AppModule {}
