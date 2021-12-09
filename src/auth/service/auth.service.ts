import { Injectable } from '@nestjs/common';
import { User } from '@src/database/entity/user/user.entity';
import { UserService } from '@src/user/service/user.service';
import { BcryptService } from '@src/utils/service/bcrypt.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async validateUser(
        email: string,
        password: string,
    ): Promise<User | undefined> {
        const user = await this.userService.findOneBy({
            email,
        });
        const isCompare = await BcryptService.compare(password, user.password);

        if (isCompare) return user;
    }
}
