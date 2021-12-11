import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@src/database/entity/user/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto';
import { UserModule } from '../user.module';
import { UserService } from './user.service';

describe('UserService', () => {
    let userService: UserService;
    let userRepository: Repository<User>;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [UserModule],
        }).compile();

        userService = module.get<UserService>(UserService);
        userRepository = module.get<Repository<User>>('USER_REPOSITORY');
    });

    afterEach(async () => {
        await userRepository.clear();
    });

    it('should be defined', () => {
        expect(userService).toBeDefined();
        expect(userRepository).toBeDefined();
    });

    it('create user test', async () => {
        const createUserDto: CreateUserDto = {
            email: 'test@eamil.com',
            password: '123',
        };
        const user = await userService.save(createUserDto);

        expect(user.id).toBeDefined();
        expect(user.password).not.toBe(createUserDto.password);
    });

    it('find one user test', async () => {
        const createUserDto: CreateUserDto = {
            email: 'test@eamil.com',
            password: '123',
        };
        const user = await userService.save(createUserDto);

        const findedUser = await userService.findOneBy({ email: user.email });

        expect(findedUser).toBeDefined();
        expect(findedUser.id).toBe(user.id);
    });

    it('convert public user test', async () => {
        const createUserDto: CreateUserDto = {
            email: 'test@eamil.com',
            password: '123',
        };
        const target = await userService.save(createUserDto);

        const publicUser = await userService.convertPublicUser(target);

        expect(publicUser).toBeDefined();
        expect(publicUser.password).not.toBeDefined();
        expect(publicUser.id).toBe(target.id);
    });
});
