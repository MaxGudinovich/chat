import { Chat } from './../../helpers/types';
import { ChatsService } from './../../data/services/chats.service';
import { SocketService } from '../../data/services/socket.service';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
})
export class ChatsComponent {
  router = inject(Router);
  chatsService = inject(ChatsService);
  socketService = inject(SocketService);
  chats: Chat[] = [];

  ngOnInit(): void {
    this.socketService.isConnected$
      .pipe(
        filter((isConnected) => isConnected), // Пропускаем только значения true
        switchMap(() => this.socketService.getRooms()) // Выполняем getRooms после подключения
      )
      .subscribe({
        next: (rooms) => {
          this.chats = rooms;
          console.log(this.chats);
        },
        error: (err) => {
          console.error('Error fetching rooms:', err);
        },
      });
  }

  handleGoToChat(chat: Chat): void {
    this.router.navigate([`/chat/${chat._id}`]);
  }
}
