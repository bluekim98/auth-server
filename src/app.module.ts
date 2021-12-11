import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { AppConfigModule } from './app-config/app-config.module';
import { UtilsModule } from './utils/utils.module';

@Module({
    imports: [
        AuthModule,
        UserModule,
        DatabaseModule,
        AppConfigModule,
        UtilsModule,
    ],
})
export class AppModule {}
