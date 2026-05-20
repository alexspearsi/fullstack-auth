import { UserRole } from '@/generated/prisma/enums';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserService } from '@/user/user.service';
import { type Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(private readonly userService: UserService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (typeof request.session.userId === 'undefined') {
      throw new UnauthorizedException(
        'Пользователь не авторизован. Пожалуйста, войдите в систему, чтобы получить доступ.'
      )
    }

    const user = await this.userService.findById(request.session.userId)

    request.user = user;

    return true;
  }
}