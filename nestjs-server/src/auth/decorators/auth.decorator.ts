import { applyDecorators, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from './roles.decorator';
import { AuthGuard } from '../guard/auth.guard';
import { UserRole } from '@/generated/prisma/enums';

export function Authorization(...roles: UserRole[]) {
  if (roles.length > 0) {
    return applyDecorators(
      Roles(...roles),
      UseGuards(AuthGuard, RolesGuard)
    )
  }

  return applyDecorators(UseGuards(AuthGuard))
}