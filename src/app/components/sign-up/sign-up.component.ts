import { Component } from '@angular/core';
import { PrimaryButtonComponent } from '../../ui/primary-button/primary-button.component';
import { PrimaryInputComponent } from '../../ui/primary-input/primary-input.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [PrimaryButtonComponent, PrimaryInputComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {}
