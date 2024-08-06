import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../helpers/types';
import { inject } from '@angular/core';
import { UsersService } from '../../data/services/users.service';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss',
})
export class UserInfoComponent {
  usersService = inject(UsersService);

  users: User[] = [];

  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe({
      next: (val) => {
        this.users = val;
        console.log(this.users);
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      },
    });
  }
}
