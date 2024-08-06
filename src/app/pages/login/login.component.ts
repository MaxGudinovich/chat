import { Component } from '@angular/core';
import { AuthenticationComponent } from '../../components/authentication/authentication.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthenticationComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {}
