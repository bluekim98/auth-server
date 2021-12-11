import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@src/database/entity/user/user.entity';
import { CreateUserDto } from '@src/user/dto';
import { UserService } from '@src/user/service/user.service';
import { UserModule } from '@src/user/user.module';
import { Repository } from 'typeorm';
import { AuthModule } from '../auth.module';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    let authService: AuthService;
    let userService: UserService;
    let userRepository: Repository<User>;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AuthModule, UserModule],
        }).compile();

        authService = module.get<AuthService>(AuthService);
        userService = module.get<UserService>(UserService);
        userRepository = module.get<Repository<User>>('USER_REPOSITORY');
    });

    afterEach(async () => {
        await userRepository.clear();
    });

    it('should be defined', () => {
        expect(authService).toBeDefined();
        expect(userService).toBeDefined();
        expect(userRepository).toBeDefined();
    });

    it('validate user test', async () => {
        const email = 'test@email.com';
        const password = '123';

        const createUserDto: CreateUserDto = { email, password };
        const user = await userService.save(createUserDto);
        expect(user).toBeDefined();

        const rejectedUser = await authService.validateUser(email, '1234');
        expect(rejectedUser).not.toBeDefined();

        const passedUser = await authService.validateUser(email, password);
        expect(passedUser).toBeDefined();
    });
});
