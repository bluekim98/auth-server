import { Module } from '@nestjs/common';
import { DatabaseModule } from '@src/database/database.module';
import { UserController } from './controller/user.controller';
import { userProviders } from './service/user.providers';
import { UserService } from './service/user.service';

@Module({
    imports: [DatabaseModule],
    providers: [UserService, ...userProviders],
    exports: [UserService],
    controllers: [UserController],
})
export class UserModule {}
