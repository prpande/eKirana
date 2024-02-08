import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { RouterService } from '../services/router.service';

export const checkoutBeginGuard: CanActivateFn = (route, state) => {
  let routerService = inject(RouterService);
  routerService.checkoutStarted.next(true);
  return true;
};
