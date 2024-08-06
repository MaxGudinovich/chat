import { Component, inject } from '@angular/core';
import { ChatsComponent } from './../components/chats/chats.component';
import { UserInfoComponent } from '../components/user-info/user-info.component';
import { RouterOutlet } from '@angular/router';
import { ProfileService } from '../data/services/profile.service';
import { User } from '../helpers/types';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [ChatsComponent, UserInfoComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  profileService = inject(ProfileService);

  profile: User | null = null;

  ngOnInit(): void {
    this.profileService.getUserInfo().subscribe((val) => {
      this.profile = val;
      console.log(this.profile);
    });
  }
}
