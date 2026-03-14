import { CanActivateFn } from '@angular/router';

export const dGuard: CanActivateFn = (route, state) => {
  return true;
};
