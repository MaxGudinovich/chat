import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { lastValueFrom } from 'rxjs';
import { TokenResponse } from './auth.interface';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  router = inject(Router);
  http = inject(HttpClient);
  cookieService = inject(CookieService);
  baseUrl = 'http://localhost:3000/';
  access: string = '';

  private isTokenRefreshing = false; // Флаг для проверки, обновляется ли токен
  private tokenRefreshPromise: Promise<TokenResponse> | null = null; // Промис для процесса обновления токена

  login(payload: { username: string; password: string }): Observable<any> {
    return this.http.post<TokenResponse>(`${this.baseUrl}login`, payload).pipe(
      tap((response) => {
        const token = response.token;
        const refreshToken = response.refreshToken;

        this.access = token;
        this.cookieService.set('access', token);
        this.cookieService.set('refresh', refreshToken);
      })
    );
  }

  refreshAuthTokens(): Observable<TokenResponse> {
    if (this.isTokenRefreshing) {
      // Если токен уже обновляется, возвращаем существующий промис
      return new Observable((observer) => {
        this.tokenRefreshPromise!.then(
          (tokenResponse) => observer.next(tokenResponse),
          (err) => observer.error(err)
        );
      });
    }

    this.isTokenRefreshing = true;

    this.tokenRefreshPromise = lastValueFrom(
      this.http
        .post<TokenResponse>(`${this.baseUrl}tokens`, {
          refreshToken: this.cookieService.get('refresh'),
        })
        .pipe(
          tap((response) => {
            console.log('refreshed');
            this.cookieService.set('access', response.token);
            this.cookieService.set('refresh', response.refreshToken);
            this.access = response.token; // Обновляем доступный токен
          }),
          catchError((error) => {
            this.cookieService.delete('access');
            this.cookieService.delete('refresh');
            this.router.navigate(['/login']);
            return throwError(() => error);
          })
        )
    ).finally(() => {
      this.isTokenRefreshing = false; // Сбрасываем флаг после завершения
    });

    return new Observable((observer) => {
      this.tokenRefreshPromise!.then(
        (tokenResponse) => observer.next(tokenResponse),
        (err) => observer.error(err)
      );
    });
  }

  logout() {
    this.cookieService.delete('access');
    this.cookieService.delete('refresh');
    this.router.navigate(['/login']);
  }
}
