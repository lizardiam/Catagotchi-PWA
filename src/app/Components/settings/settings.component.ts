import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {UserService} from "../../Services/user.service";
import {NotificationService} from "../../Services/notification.service";
import {SwPush} from "@angular/service-worker";

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
  constructor(private userService: UserService, private router: Router, private notificationService: NotificationService, private swPush: SwPush) {}

  // Macht noch nichts
  themes: Theme[] = [
    {value: 'pink-0', viewValue: 'Pink (default)'},
    {value: 'blue-1', viewValue: 'Blue'}
  ]
  selected = 'option2';

  // Delete user Button
  onDelete() {
    // Confirmation Pop-Up to prevent accidents
    if(confirm("Are you sure you want to delete your account? This can't be reversed.")) {
      // Call user.service.ts delete() method to send to backend
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

  // Subscribe to Push Notification Button

  // VAPID key
  readonly VAPID_PUBLIC_KEY = "BEjhM6DDoUxspPqxIGOX8WZCQ7-Pw3ZOOrxHfWpPZyDpbgTj5xZb1Ei22wz62FbtskApfsfYgoEyutbCFBBajkE";
  subscribeToNotifications () {
    // Subscribe/Listen Service Worker to Push Notification
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      // use notification.service.ts to add the user to subscribers
      .then(sub => this.notificationService.addPushSubscriber(sub).subscribe())
      .catch(err => console.error("Could not subscribe to notifications", err));
  }

}
