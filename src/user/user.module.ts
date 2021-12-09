import { Module } from '@nestjs/common';
import { DatabaseModule } from '@src/database/database.module';
import { userProviders } from './service/user.providers';
import { UserService } from './service/user.service';

@Module({
    imports: [DatabaseModule],
    providers: [UserService, ...userProviders],
    exports: [UserService],
})
export class UserModule {}
