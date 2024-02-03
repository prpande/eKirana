import { CanDeactivateFn } from '@angular/router';

export const preventNavigationGuard: CanDeactivateFn<unknown> = (component: any, currentRoute, currentState, nextState) => {
  return component.canDeactivate();
};
