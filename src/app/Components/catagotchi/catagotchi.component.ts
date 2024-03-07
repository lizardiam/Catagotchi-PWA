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

  // Access the images to be able to adjust their size/scale in a responsive way
  @ViewChild('underlay') underlayElement!: ElementRef;
  @ViewChild('background') backgroundElement!: ElementRef;
  @ViewChild('overlay') overlayElement!: ElementRef;

  // Use the below implemented methods after the view init lifecycle event to actually adjust all images to screen size
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
  // To adjust the width of the underlaying image (responsive)
  adjustUnderlayWidth() {
      if (this.underlayElement && this.backgroundElement) {
        console.log(this.backgroundElement.nativeElement.offsetWidth + 'px');
        this.underlayElement.nativeElement.style.width = this.backgroundElement.nativeElement.offsetWidth + 'px';
      }
  }

  @HostListener('window:resize')
  // To adjust scale of the cat images in a responsive way
  adjustOverlayScale() {
    if (this.overlayElement && this.backgroundElement) {
      console.log((this.backgroundElement.nativeElement.offsetWidth * 0.15) + '%')
      this.overlayElement.nativeElement.style.scale = (this.backgroundElement.nativeElement.offsetWidth * 0.15) + '%';
    }
  }

  // Swap overlay image (cat image) related to the _level value of the cat (res from backend)
  overlayImages: Array<{ src: string; alt: string;}> = [];
  updateOverlay () {
    const level = this.level;
    let src = '';
    let alt = '';

    if (level < 20) {
      src = '../assets/images/overlayImages/smolboi.png';
      alt = 'Your small kitten (Level 1)';
      this.overlayImages = [{
        src,
        alt
      }];
    }
    else if (level >= 20 && level < 50) {
      src = '../assets/images/overlayImages/mid.png';
      alt = 'Your kitten (Level 2)';
      this.overlayImages = [{
        src,
        alt
      }];
    }
    else if (level >= 50 && level <= 99) {
      src = '../assets/images/overlayImages/bigboi.png'; // Assuming you have a level 3 image
      alt = 'Your bigger kitten (Level 3)';
      this.overlayImages = [{
        src,
        alt
      }];
    }
    else if (level == 100) {
      src = '../assets/images/overlayImages/grown_cat.png';
      alt = 'Your adult grown cat (Level 4)';
      this.overlayImages = [{
        src,
        alt
      }];
    }

  }

  // Progress Bars/Spinners declarations
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 75; //TODO


  // Log out
  onLogout() {
    // Call the logout Method of user.service.ts to send to backend
    this.userService.logout().subscribe({
      next: (response) => {
        console.log('Login successful', response);
        // If successful, navigate to Landing Page
        this.router.navigate(['/landing-page']);
      },
      error: (error) => {
        console.error('Logout failed', error);
      }
    });
  }

  // Welcome Message display declarations
  showMessage: boolean = false;
  catName: string = '';
  foodLevel: number = 0;
  waterLevel: number = 0;
  happiness: number = 0;
  level: number = 1;
  private intervalId: any;

  // Bei init lifecycle event (und dann alle 30s) sollen alle Katzendaten geladen werden
  //TODO: Message nur nach redirect von /login oder /register anzeigen
  ngOnInit() {
    this.fetchCatName();
    this.fetchCatData();

    // call again every 30 seconds
    this.intervalId = setInterval(() => {
      this.fetchCatData();
    }, 30000);
  }

  // Bei destroy lifecycle event soll das Intervall wieder gelöscht werden, um Probleme zu verhindern
  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  fetchCatName () {
    // Call cat.service.ts to get cat name from the backend
    this.catService.getCatData().subscribe({
      next: (data: any) => {
        // Take cat name from backend for the message
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
    // Call cat.service.ts to get cat data from the backend
    this.catService.getCatData().subscribe({
      next: (data: any) => {
        // Update levels displayed to the values sent from backend
        this.foodLevel = data._foodlevel;
        this.waterLevel = data._waterlevel;
        this.happiness = data._happiness;
        this.level = data._level;
        console.log("Sent values: ", data._waterlevel, data._foodlevel, data._happiness, data._level);
        // update the cat image if it leveled up
        this.updateOverlay();
      },
      error: (error) => {
        console.error('Failed to fetch cat data', error);
      },
    });
  }

  feedCat() {
    // Call cat.service.ts to send data to the backend to feed the cat
    this.catService.feedCat().subscribe({
      next: (response) => {
        console.log("Cat fed successfully", response);
        this.fetchCatData(); // Fetch updated cat data
      },
      error: (error) => console.error("Failed to feed cat", error)
    });
  }

  waterCat() {
    // Call cat.service.ts to send data to the backend to water the cat
    this.catService.waterCat().subscribe({
      next: (response) => {
        console.log("Cat watered successfully", response);
        this.fetchCatData(); // Fetch updated cat data
      },
      error: (error) => console.error("Failed to water cat", error)
    });
  }

  petCat() {
    // Call cat.service.ts to send data to the backend to pet the cat
    this.catService.petCat().subscribe({
      next: (response) => {
        console.log("Cat pet successfully", response);
        this.fetchCatData(); // Fetch updated cat data
      },
      error: (error) => console.error("Failed to pet cat", error)
    });
  }

}
