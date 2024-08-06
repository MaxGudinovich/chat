import { AuthService } from './../../auth/auth.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { Component } from '@angular/core';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { PrimaryButtonComponent } from '../../ui/primary-button/primary-button.component';
import { PrimaryInputComponent } from '../../ui/primary-input/primary-input.component';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [PrimaryButtonComponent, PrimaryInputComponent, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  router = inject(Router);
  authService = inject(AuthService);
  cookieService = inject(CookieService);

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  onSubmit(event: Event): void {
    event.preventDefault();
    console.log('Form values:', this.form.value);

    //@ts-ignore

    this.authService
      .login(this.form.value as { username: string; password: string })
      .subscribe(() => {
        this.router.navigate(['/']);
        console.log(this.cookieService.get('access'));
      });
  }
}
