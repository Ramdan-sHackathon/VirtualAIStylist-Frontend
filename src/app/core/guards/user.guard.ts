import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';

export const userGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);

  if (localStorage.getItem('Token')) {
    return true; // السماح بالدخول
  } else {
    return _Router.createUrlTree(['/login']);
  }
};
