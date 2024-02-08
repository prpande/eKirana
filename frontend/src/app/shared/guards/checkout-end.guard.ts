import { CanDeactivateFn } from '@angular/router';
import { RouterService } from '../services/router.service';
import { inject } from '@angular/core';

export const checkoutEndGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  let routerService = inject(RouterService);
  routerService.checkoutStarted.next(false);
  return true;
};
