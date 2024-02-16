import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-catagotchi',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './catagotchi.component.html',
  styleUrl: './catagotchi.component.scss'
})

export class CatagotchiComponent {

  overlayImages = [
    {
      src: '../assets/images/overlayImages/grown_cat.png',
      alt: 'Your adult grown cat',
      originalTop: 40.55,
      originalScale: 1.1,
      top: '40.55%'
    }
  ];

  // https://github.com/davidjbradshaw/image-map-resizer/blob/master/js/imageMapResizer.js
  // Call adjustOverlayPositions on window resize or on initial load
  // ngOnInit() {
  //  this.adjustOverlayScale();
  // }
  //  @HostListener('window:resize')
  //  this.adjustOverlayScale();
  //}

/*
  @ViewChild('fixedimage') imageElement!: ElementRef;
  fixedImageWidth: number | undefined;
  constructor() {}

  updateImageWidth() {
    this.fixedImageWidth = this.imageElement.nativeElement.width;
    console.log('Image width:', this.fixedImageWidth); // Just for demonstration
  }

  ngAfterViewInit(): void {
    // Ensure the image is loaded to get its dimensions
    const img: HTMLImageElement = this.imageElement.nativeElement;
    if (img.complete) {
      // Image is loaded; get the width immediately
      this.updateImageWidth();
    } else {
      // If the image isn't loaded yet, add a load event listener
      img.onload = () => {
        this.updateImageWidth();
      };
    }
  }


    @HostListener('window:resize', ['$event'])
  onResize(event: Event) {

  }
  */
}
