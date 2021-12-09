import { Module } from '@nestjs/common';
import { AppConfigModule } from '@src/app-config/app-config.module';
import { databaseProviders } from './service/database.providers';

@Module({
    imports: [AppConfigModule],
    providers: [...databaseProviders],
    exports: [...databaseProviders],
})
export class DatabaseModule {}
