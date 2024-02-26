import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {ThemePalette} from "@angular/material/core";
import {MatCardModule} from "@angular/material/card";
import {UserService} from "../../Services/user.service";
import {response} from "express";
import {routes} from "../../app.routes";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private userService: UserService, private router: Router) {}

  hide = true;
  colorControl = new FormControl('primary' as ThemePalette);

  username: string = '';
  password: string = '';

   onLogin () {
    if (this.username && this.password) {
      this.userService.login(this.username, this.password).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          this.router.navigate(['/', 'catagotchi']).then(success => {
            console.log('Navigated successfully', success)
          }).catch(error => {
            console.log('Navigation error', error)
          });
        },
        error: (error) => {
          console.error('Error trying to log in', error);
        }
      });
    }
  }

}
