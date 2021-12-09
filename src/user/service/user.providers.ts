import { User } from '@src/database/entity/user/user.entity';
import { Connection } from 'typeorm';

export const userProviders = [
    {
        provide: 'USER_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(User),
        inject: ['DATABASE_CONNECTION'],
    },
];
