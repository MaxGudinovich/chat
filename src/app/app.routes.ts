import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { ActiveChatComponent } from './components/active-chat/active-chat.component';
import { LoginComponent } from './pages/login/login.component';
import { canActivateAuth } from './helpers/auth.guard';
import { canActivateLogin } from './helpers/login.guard';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [canActivateAuth],
    children: [
      {
        path: 'chat/:roomId',
        component: ActiveChatComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [canActivateLogin],
  },
];
