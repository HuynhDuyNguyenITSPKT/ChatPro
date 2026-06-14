import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Model } from 'mongoose';
import { User } from 'src/user/user.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector,
        @InjectModel(User.name)
        private readonly userModel: Model<User>) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        const user2 = await this.userModel.findOne({
            email: user.email,
        });

        user.role = user2?.role;

        console.log(user);

        const hasRole = requiredRoles.some((role) => user.role === role);
        if (!hasRole) {
            throw new ForbiddenException('Bạn không có quyền này');
        }
        return true;
    }
}
