import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../../helpers/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http = inject(HttpClient);
  baseUrl = 'http://localhost:3000/';

  getUserInfo(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}userInfo`);
  }
}
