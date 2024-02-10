import { CanActivateFn } from '@angular/router';
import { RouterService } from '../services/router.service';
import { inject } from '@angular/core';

export const dashStartGuard: CanActivateFn = (route, state) => {
  let routerService = inject(RouterService);
  routerService.dashStarted.next(true);
  return true;
};
