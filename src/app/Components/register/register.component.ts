import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {ThemePalette} from "@angular/material/core";
import {MatCardModule} from "@angular/material/card";
import {UserService} from "../../Services/user.service";
import {response} from "express";
import {MatStepperModule} from "@angular/material/stepper";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatIconModule, MatCardModule, MatStepperModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private userService: UserService, private router: Router) {}

  //UI Form ELements
  hide = true;
  colorControl = new FormControl('primary' as ThemePalette);
  uiEmail = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.uiEmail.hasError('required')) {
      return 'You must enter a value';
    }
    return this.uiEmail.hasError('email') ? 'Not a valid email' : '';
  }

  // UI Stepper Elements
  isLinear = true;


  // Backend Register etc
  username: string = '';
  password: string = '';
  email: string = '';
  name: string = '';

  onRegister () {
    if (this.username && this.password && this.email && this.name) {
      this.userService.register(this.username, this.password, this.email, this.name).subscribe({
        next: response => {
          console.log('Registered successfully.', response);
          this.router.navigate(['/catagotchi']).then(success => {
            console.log('Navigated successfully', success)
          }).catch(error => {
            console.log('Navigation error', error)
          });
        },
        error: (error) => {
          console.error('Error trying to register', error);
        }
      });
    }
  }


}
