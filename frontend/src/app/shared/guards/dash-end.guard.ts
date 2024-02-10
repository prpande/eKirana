import { CanDeactivateFn } from '@angular/router';
import { RouterService } from '../services/router.service';
import { inject } from '@angular/core';

export const dashEndGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  let routerService = inject(RouterService);
  routerService.dashStarted.next(false);
  return true;
};
