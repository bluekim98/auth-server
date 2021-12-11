import { Controller, Get, Post, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@src/database/entity/user/user.entity';
import { Request } from 'express';
import { UseJwtRefreshAuthGuard, UseLocalAuthGuard } from '../guard';
import { AuthService } from '../service/auth.service';

export interface RequestWithUser extends Request {
    user: User;
}

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
    ) {}

    @UseLocalAuthGuard()
    @Post('login')
    async login(@Req() req: RequestWithUser) {
        const tokenCookies = this.authService.generateTokenCookies(req.user);
        req.res.setHeader('Set-Cookie', [...tokenCookies]);
        return req.user;
    }

    @UseJwtRefreshAuthGuard()
    @Get('refresh')
    async refreshJwtToken(@Req() req: RequestWithUser) {
        const jwtAccessTokenCookie =
            this.authService.generateJwtAccessTokenCookie(req.user);
        req.res.setHeader('Set-Cookie', [jwtAccessTokenCookie]);
        return req.user;
    }
}
