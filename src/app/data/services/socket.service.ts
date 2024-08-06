import { inject, Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../auth/auth.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket!: Socket;
  private isConnectedSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  isConnected$ = this.isConnectedSubject.asObservable();

  cookieService = inject(CookieService);
  authService = inject(AuthService);

  constructor() {
    this.checkTokenAndConnect();
  }

  private checkTokenAndConnect(): void {
    const access = this.cookieService.get('access');
    const currentTime = Math.floor(Date.now() / 1000);

    let decodedToken: any;
    try {
      decodedToken = jwtDecode(access);
    } catch (e) {
      this.refreshTokenAndConnect();
      return;
    }

    if (currentTime < decodedToken.exp) {
      this.connectSocket(access);
    } else {
      this.refreshTokenAndConnect();
    }
  }

  private refreshTokenAndConnect(): void {
    this.authService.refreshAuthTokens().subscribe({
      next: (response) => {
        this.connectSocket(response.token);
      },
      error: (err) => {
        console.error('Failed to refresh token:', err);
      },
    });
  }

  private connectSocket(token: string): void {
    this.socket = io('http://localhost:3000', {
      query: { access: token },
      withCredentials: true,
      transports: ['websocket'],
    });

    this.socket.on('connect', () => {
      console.log('Connected to server');
      this.isConnectedSubject.next(true); // Обновляем состояние подключения
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
      this.isConnectedSubject.next(false); // Обновляем состояние подключения
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection Error:', error);
      this.isConnectedSubject.next(false); // Обновляем состояние подключения
    });
  }

  sendMessage(message: string): void {
    this.socket.emit('message', message);
  }

  getMessage(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on('message', (message: string) => {
        observer.next(message);
      });
    });
  }

  getRooms(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('rooms', (rooms) => {
        observer.next(rooms);
      });
      this.socket.on('roomAdded', (room) => {
        observer.next(room);
      });
    });
  }
}
