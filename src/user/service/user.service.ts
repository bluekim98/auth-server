import { Inject, Injectable } from '@nestjs/common';
import { User } from '@src/database/entity/user/user.entity';
import { BcryptService } from '@src/utils/service/bcrypt.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto';

export interface UserFindOneWhere {
    id?: number;
    email?: string;
    password?: string;
}

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY')
        private readonly userRepository: Repository<User>,
    ) {}

    async save(createUserDto: CreateUserDto): Promise<User> {
        const hashedPassword = await BcryptService.hash(createUserDto.password);

        const payload: User = {
            ...createUserDto,
            password: hashedPassword,
        };

        return await this.userRepository.save(payload);
    }

    async findOneBy(where: UserFindOneWhere) {
        return await this.userRepository.findOne(where);
    }

    async convertPublicUser(target: User): Promise<User> {
        const { password, ...user } = target;
        return { ...user };
    }
}
