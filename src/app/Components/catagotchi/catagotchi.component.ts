import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-catagotchi',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './catagotchi.component.html',
  styleUrl: './catagotchi.component.css'
})
export class CatagotchiComponent {
  overlayImages = [
    {src: '../assets/images/overlayImages/grown_cat.png', alt: 'Your adult grown cat'}
  ];
  overlayPosition= {top: '285px', left: '865px'};
}
