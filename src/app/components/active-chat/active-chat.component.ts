import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../data/services/users.service';
import { ChatsService } from '../../data/services/chats.service';
import { User } from '../../helpers/types';

@Component({
  selector: 'app-active-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './active-chat.component.html',
  styleUrl: './active-chat.component.scss',
})
export class ActiveChatComponent {
  chatService = inject(ChatsService);
  usersService = inject(UsersService);
  route = inject(ActivatedRoute);

  username = '';
  filteredUsers: User[] = [];

  chatName: string = '';
  messages: string[] = [];
  message: string = '';

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const roomId = params.get('roomId');
      if (roomId) {
        this.chatService.getChatById(roomId).subscribe((chat) => {
          this.chatName = chat.name;
          console.log('Chat:', chat);
        });
      }
    });
  }

  onSearch(value: string): void {
    this.username = value;
    if (value.trim() === '') {
      this.filteredUsers = [];
    } else {
      this.usersService.searchUsers(value).subscribe((users) => {
        this.filteredUsers = users;
      });
    }
  }

  addUserToRoom(user: any): void {
    console.log('Adding user:', user);
    this.route.paramMap.subscribe((params) => {
      const roomId = params.get('roomId');
      if (roomId) {
        this.chatService.addUserToRoom(roomId, user._id).subscribe((chat) => {
          console.log('User added:', chat);
          this.filteredUsers = [];
          this.username = '';
        });
      }
    });
  }
}
