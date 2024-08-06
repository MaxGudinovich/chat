import { Component } from '@angular/core';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { SignInComponent } from '../sign-in/sign-in.component';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [SignUpComponent, SignInComponent],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss',
})
export class AuthenticationComponent {}
