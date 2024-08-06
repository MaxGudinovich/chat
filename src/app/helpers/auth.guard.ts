import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const canActivateAuth = () => {
  const cookieService = inject(CookieService);
  const access = cookieService.get('access');

  if (access) {
    return true;
  }

  return inject(Router).createUrlTree(['/login']);
};
