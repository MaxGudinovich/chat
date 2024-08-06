import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const canActivateLogin = () => {
  const router = inject(Router);
  const cookieService = inject(CookieService);
  const access = cookieService.get('access');

  if (access) {
    return router.createUrlTree(['/']);
  }

  return true;
};
