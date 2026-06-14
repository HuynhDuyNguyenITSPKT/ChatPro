import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly authService: AuthService,
        private readonly reflector: Reflector,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        const isRoleRestricted = !!requiredRoles;

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException(isRoleRestricted ? 'Bạn không có quyền này' : 'Yêu cầu token xác thực');
        }

        const isBlacklisted = await this.authService.isTokenBlacklisted(token);
        if (isBlacklisted) {
            throw new UnauthorizedException(isRoleRestricted ? 'Bạn không có quyền này' : 'Token đã bị đăng xuất');
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_ACCESS_SECRET,
            });
            request['user'] = payload;
        } catch (error) {
            throw new UnauthorizedException(isRoleRestricted ? 'Bạn không có quyền này' : 'Token không hợp lệ hoặc đã hết hạn');
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
