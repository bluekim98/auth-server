import { Injectable } from '@nestjs/common';
import { User } from '@src/database/entity/user/user.entity';
import { UserService } from '@src/user/service/user.service';
import { BcryptService } from '@src/utils/service/bcrypt.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export enum TokenType {
    JWT_ACCESS_TOKEN = 'Authentication',
    JWT_REFRESH_TOKEN = 'Refresh',
}

@Injectable()
export class AuthService {
    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) {}

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

    generateTokenCookies(user: User): string[] {
        const accessTokenCookie = this.generateJwtAccessTokenCookie(user);
        const refreshTokenCookie = this.generateJwtRefreshTokenCookie(user);

        return [accessTokenCookie, refreshTokenCookie];
    }

    generateJwtAccessTokenCookie(user: User): string {
        const token = this.generateJwtAccessToken(user);
        return this.getCookieByToken(TokenType.JWT_ACCESS_TOKEN, token);
    }

    generateJwtRefreshTokenCookie(user: User): string {
        return this.getCookieByToken(
            TokenType.JWT_REFRESH_TOKEN,
            this.generateRefreshToken(user),
        );
    }

    generateJwtAccessToken(user: User): string {
        const payload = { sub: user.id, username: user.email };
        const token = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_ACCESS_SECRET'),
            expiresIn: Number(process.env.JWT_ACCESS_EXPIRES),
        });
        return token;
    }

    generateRefreshToken(user: User): string {
        const payload = { sub: user.id, username: user.email };

        const token = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: Number(process.env.JWT_REFRESH_EXPIRES),
        });
        return token;
    }

    getCookieByToken(type: TokenType, token: string): string {
        let expiresConfigTitle: string;
        switch (type) {
            case TokenType.JWT_ACCESS_TOKEN:
                expiresConfigTitle = 'JWT_ACCESS_EXPIRES';
                break;
            case TokenType.JWT_REFRESH_TOKEN:
                expiresConfigTitle = 'JWT_REFRESH_EXPIRES';
                break;
        }
        const maxAge = this.configService.get<number>(expiresConfigTitle);

        return `${type}=${token}; HttpOnly; Path=/; Max-Age=${maxAge}`;
    }
}
