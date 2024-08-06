import { Component } from '@angular/core';
import { User } from '../../helpers/types';
import { ProfileService } from '../../data/services/profile.service';
import { inject } from '@angular/core';
import { UserInfoComponent } from '../../components/user-info/user-info.component';
import { ChatsComponent } from '../../components/chats/chats.component';
import { ActiveChatComponent } from '../../components/active-chat/active-chat.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [UserInfoComponent, ChatsComponent, ActiveChatComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  profileService = inject(ProfileService);

  profile: User | null = null;

  ngOnInit(): void {
    this.profileService.getUserInfo().subscribe((val) => {
      this.profile = val;
      console.log(this.profile);
    });
  }
}
