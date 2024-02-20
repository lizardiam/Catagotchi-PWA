import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";

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
  themes: Theme[] = [
    {value: 'pink-0', viewValue: 'Pink (default)'},
    {value: 'blue-1', viewValue: 'Blue'}
  ]
  selected = 'option2';
}
