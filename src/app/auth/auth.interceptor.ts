import { jwtDecode } from 'jwt-decode';
import { AuthService } from './auth.service';
import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { inject } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const cookieService = inject(CookieService);
  const access = cookieService.get('access');

  if (req.url.endsWith('/tokens')) {
    return next(req);
  }

  if (!access) return next(req);

  const currentTime = Math.floor(Date.now() / 1000);
  const decodedToken: any = jwtDecode(access);

  if (currentTime < decodedToken.exp) {
    return next(addToken(req, access));
  }

  return refreshAndProceed(authService, req, next);
};

const refreshAndProceed = (
  authService: AuthService,
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<any> => {
  return authService.refreshAuthTokens().pipe(
    switchMap((res) => {
      return next(addToken(req, res.token));
    }),
    catchError((err) => {
      console.error('Error refreshing token:', err);
      authService.logout();
      return throwError(() => err);
    })
  );
};

const addToken = (req: HttpRequest<any>, access: string) => {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${access}`,
    },
  });
};
