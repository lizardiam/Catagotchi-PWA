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

  @ViewChild('underlay') underlayElement!: ElementRef;
  @ViewChild('background') backgroundElement!: ElementRef;
  @ViewChild('overlay') overlayElement!: ElementRef;

  ngOnInit() {

  }

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

}
