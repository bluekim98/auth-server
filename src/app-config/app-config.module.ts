import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

const stg = '.development.env';
const prd = '.env';
const env = process.env.NODE_ENV === 'production' ? prd : stg;
const envFilePath = `config/${env}`;

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath,
            isGlobal: true,
        }),
    ],
})
export class AppConfigModule {}
