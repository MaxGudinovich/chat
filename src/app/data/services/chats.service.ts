import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Chat } from '../../helpers/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  http = inject(HttpClient);
  baseUrl = 'http://localhost:3000/';

  getChats(): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${this.baseUrl}room`);
  }

  getChatById(id: string): Observable<Chat> {
    console.log('Getting chat by id:', id);
    return this.http.get<Chat>(`${this.baseUrl}room/${id}`);
  }

  addUserToRoom(roomId: string, userId: string): Observable<Chat> {
    console.log('Adding user to room FROM CHATS SERVICE:', userId);
    return this.http.post<Chat>(`${this.baseUrl}room/${roomId}`, {
      userId,
    });
  }
}
