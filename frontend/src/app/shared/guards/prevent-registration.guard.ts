import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from 'src/app/user/services/auth.service';

export const preventRegistrationGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  return !authService.isLoggedIn;
};
