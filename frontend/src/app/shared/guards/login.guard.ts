import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from 'src/app/user/services/auth.service';
import { LoggerService } from '../components/logger/services/logger.service';
import { RouterService } from '../services/router.service';

export const loginGuard: CanActivateFn = (route, state) => {
  let authService: AuthService = inject(AuthService);
  let logger: LoggerService = inject(LoggerService);
  let routerService: RouterService = inject(RouterService);

  if (!authService.isLoggedIn) {
    logger.error(`Trying to access authorized resource [${state.url}] without logging in.`);
    routerService.goToLogin();
    return false;
  }

  logger.info("User is logged in.")
  return true;
};
