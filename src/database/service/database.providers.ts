import { ConfigService } from '@nestjs/config';
import { createConnection } from 'typeorm';
import { User } from '../entity/user/user.entity';

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async (configService: ConfigService) =>
            await createConnection({
                type: 'mysql',
                host: configService.get('MYSQL_HOST'),
                port: configService.get<number>('MYSQL_PORT'),
                username: configService.get('MYSQL_USER'),
                password: configService.get('MYSQL_PASSWORD'),
                database: configService.get('MYSQL_DATABASE'),
                // entities: [__dirname + '/../entity/**/*.ts'],
                entities: [User],
                synchronize: true,
                // logging: ['query', 'error'],
            }),
        inject: [ConfigService],
    },
];
