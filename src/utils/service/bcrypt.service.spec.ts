import { Test, TestingModule } from '@nestjs/testing';
import { UtilsModule } from '../utils.module';
import { BcryptService } from './bcrypt.service';

describe('UserService', () => {
    let bcryptService: BcryptService;
    const password = '123';

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [UtilsModule],
        }).compile();

        bcryptService = module.get<BcryptService>(BcryptService);
    });

    it('should be defined', () => {
        expect(bcryptService).toBeDefined();
    });

    it('hash test', async () => {
        const hashedPassword = await BcryptService.hash(password);
        expect(hashedPassword).not.toBe(password);
    });

    it('success compare test', async () => {
        const hashedPassword = await BcryptService.hash(password);
        const isCompare = await BcryptService.compare(password, hashedPassword);
        expect(isCompare).toBe(true);
    });

    it('failed compare test', async () => {
        const hashedPassword = await BcryptService.hash('123a');
        const isCompare = await BcryptService.compare(password, hashedPassword);
        expect(isCompare).not.toBe(true);
    });
});
