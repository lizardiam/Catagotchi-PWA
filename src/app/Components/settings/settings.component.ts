import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {UserService} from "../../Services/user.service";

interface Theme {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  constructor(private userService: UserService, private router: Router) {}

  themes: Theme[] = [
    {value: 'pink-0', viewValue: 'Pink (default)'},
    {value: 'blue-1', viewValue: 'Blue'}
  ]
  selected = 'option2';

  // Delete user
  onDelete() {
    if(confirm("Are you sure you want to delete your account? This can't be reversed.")) {
      this.userService.delete().subscribe({
        next: (response) => {
          console.log('Account deleted successfully');
          this.router.navigate(['/landing-page']);
        },
        error: (error) => {
          console.error('Error deleting account', error);
        }
      });
    }

  }

}
