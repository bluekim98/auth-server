import { createConnection } from 'typeorm';
import { User } from '../entity/user/user.entity';

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () =>
            await createConnection({
                type: 'mysql',
                host: process.env.MYSQL_HOST,
                port: Number(process.env.MYSQL_PORT),
                username: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                database: process.env.MYSQL_DATABASE,
                // entities: [__dirname + '/../entity/**/*.ts'],
                entities: [User],
                synchronize: true,
                // logging: ['query', 'error'],
            }),
    },
];
