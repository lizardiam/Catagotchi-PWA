import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd} from '@angular/router';
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {ThemePalette} from "@angular/material/core";
import {MatProgressSpinnerModule, ProgressSpinnerMode} from "@angular/material/progress-spinner";
import {UserService} from "../../Services/user.service";
import {CatService} from "../../Services/cat.service";
import {response} from "express";
import { filter } from 'rxjs/operators';

interface CatData {
  name: string;
  userid: number;
  foodlevel: number;
  waterlevel: number;
  happiness: number;
}

@Component({
  selector: 'app-catagotchi',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatButtonModule, MatDividerModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './catagotchi.component.html',
  styleUrl: './catagotchi.component.scss'
})

export class CatagotchiComponent {
  constructor(private userService: UserService, private router: Router, private catService: CatService) {
  }

  overlayImages = [
    {
      src: '../assets/images/overlayImages/grown_cat.png',
      alt: 'Your adult grown cat',
      originalTop: 40.55,
      originalScale: 1.1,
      top: '40.55%'
    }
  ];

  @ViewChild('underlay') underlayElement!: ElementRef;
  @ViewChild('background') backgroundElement!: ElementRef;
  @ViewChild('overlay') overlayElement!: ElementRef;

  ngAfterViewInit() {
    const background: HTMLImageElement = this.backgroundElement.nativeElement;
    background.onload = () => {
      this.adjustUnderlayWidth();
      this.adjustOverlayScale();
      console.log(this.backgroundElement.nativeElement.offsetWidth + 'px');
      console.log((this.backgroundElement.nativeElement.offsetWidth * 0.15) + '%')
    }
  }

  @HostListener('window:resize')

  adjustUnderlayWidth() {
      if (this.underlayElement && this.backgroundElement) {
        console.log(this.backgroundElement.nativeElement.offsetWidth + 'px');
        this.underlayElement.nativeElement.style.width = this.backgroundElement.nativeElement.offsetWidth + 'px';
      }
  }

  @HostListener('window:resize')
  adjustOverlayScale() {
    if (this.overlayElement && this.backgroundElement) {
      console.log((this.backgroundElement.nativeElement.offsetWidth * 0.15) + '%')
      this.overlayElement.nativeElement.style.scale = (this.backgroundElement.nativeElement.offsetWidth * 0.15) + '%';
    }
  }

  // Progress Bars/Spinners
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 75; //TODO


  // Log out
  onLogout() {
    this.userService.logout().subscribe({
      next: (response) => {
        // on success
        console.log('Login successful', response);
        this.router.navigate(['/landing-page']);
      },
      error: (error) => {
        console.error('Logout failed', error);
      }
    });
  }

  // Welcome Message display
  showMessage: boolean = false;
  catName: string = '';

  //TODO: Message nur nach redirect von /login oder /register anzeigen
  ngOnInit() {
    this.catService.getCatData().subscribe({
      next: (data: any) => {
        this.catName = data._name;
        this.showMessage = true;
        // Hide the message after 10 seconds
        setTimeout(() => {
          this.showMessage = false;
        }, 10000);
      },
      error: (error) => {
        console.error('Failed to fetch cat name', error);
      },
    });
  }


}
