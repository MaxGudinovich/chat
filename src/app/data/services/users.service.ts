import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../../helpers/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  http = inject(HttpClient);
  baseUrl = 'http://localhost:3000/users/';

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}all`);
  }

  searchUsers(query: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/search`, {
      params: { q: query },
    });
  }
}
