import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard, JwtRefreshAuthGuard } from './jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

export const UseLocalAuthGuard = () => UseGuards(LocalAuthGuard);
export const UseJwtAuthGuard = () => UseGuards(JwtAuthGuard);
export const UseJwtRefreshAuthGuard = () => UseGuards(JwtRefreshAuthGuard);
