import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { RequestWithUser } from '@src/auth/controller/auth.controller';
import { UseJwtAuthGuard } from '@src/auth/guard';
import { CreateUserDto } from '../dto';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        const user = await this.userService.save(createUserDto);
        return this.userService.convertPublicUser(user);
    }

    @UseJwtAuthGuard()
    @Get('info')
    async getInfo(@Req() req: RequestWithUser) {
        return req.user;
    }
}
