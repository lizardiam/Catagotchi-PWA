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

interface CatData {
  name: string;
  userid: number;
  foodlevel: number;
  waterlevel: number;
  happiness: number;
  level: number;
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

  // Adjust Overlay
  overlayImages: Array<{ src: string; alt: string; originalTop: number; originalScale: number; top: string }> = [];
  updateOverlay () {
    const level = this.level;
    let src = '';
    let alt = '';

    if (level < 20) {
      src = '../assets/images/overlayImages/smolboi.png';
      alt = 'Your small kitten (Level 1)';
      this.overlayImages = [{
        src,
        alt,
        originalTop: 40.55,
        originalScale: 1.1,
        top: '40.55%'
      }];
    }
    else if (level >= 20 && level < 50) {
      src = '../assets/images/overlayImages/mid.png';
      alt = 'Your kitten (Level 2)';
      this.overlayImages = [{
        src,
        alt,
        originalTop: 40.55,
        originalScale: 1.1,
        top: '40.55%'
      }];
    }
    else if (level >= 50 && level <= 99) {
      src = '../assets/images/overlayImages/bigboi.png'; // Assuming you have a level 3 image
      alt = 'Your bigger kitten (Level 3)';
      this.overlayImages = [{
        src,
        alt,
        originalTop: 40.55,
        originalScale: 1.1,
        top: '40.55%'
      }];
    }
    else if (level == 100) {
      src = '../assets/images/overlayImages/grown_cat.png';
      alt = 'Your adult grown cat (Level 4)';
      this.overlayImages = [{
        src,
        alt,
        originalTop: 40.55,
        originalScale: 1.1,
        top: '40.55%'
      }];
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
  foodLevel: number = 0;
  waterLevel: number = 0;
  happiness: number = 0;
  level: number = 1;
  private intervalId: any;

  //TODO: Message nur nach redirect von /login oder /register anzeigen
  ngOnInit() {
    this.fetchCatName();
    this.fetchCatData();

    // call again every 30 seconds
    this.intervalId = setInterval(() => {
      this.fetchCatData();
    }, 30000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  fetchCatName () {
    this.catService.getCatData().subscribe({
      next: (data: any) => {
        // Take cat name for message
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

  fetchCatData () {
    this.catService.getCatData().subscribe({
      next: (data: any) => {
        // Update levels
        this.foodLevel = data._foodlevel;
        this.waterLevel = data._waterlevel;
        this.happiness = data._happiness;
        this.level = data._level;
        console.log("Sent values: ", data._waterlevel, data._foodlevel, data._happiness, data._level);
        this.updateOverlay();
      },
      error: (error) => {
        console.error('Failed to fetch cat data', error);
      },
    });
  }

  feedCat() {
    this.catService.feedCat().subscribe({
      next: (response) => {
        console.log("Cat fed successfully", response);
        this.fetchCatData(); // Fetch updated cat data
      },
      error: (error) => console.error("Failed to feed cat", error)
    });
  }

  waterCat() {
    this.catService.waterCat().subscribe({
      next: (response) => {
        console.log("Cat watered successfully", response);
        this.fetchCatData(); // Fetch updated cat data
      },
      error: (error) => console.error("Failed to water cat", error)
    });
  }

  petCat() {
    this.catService.petCat().subscribe({
      next: (response) => {
        console.log("Cat pet successfully", response);
        this.fetchCatData(); // Fetch updated cat data
      },
      error: (error) => console.error("Failed to pet cat", error)
    });
  }


}
