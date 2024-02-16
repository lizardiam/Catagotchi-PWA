import { Routes } from '@angular/router';
import {LoginComponent} from "./Components/login/login.component";
import {CatagotchiComponent} from "./Components/catagotchi/catagotchi.component";
import {LandingPageComponent} from "./Components/landing-page/landing-page.component";
import {RegisterComponent} from "./Components/register/register.component";
import {SettingsComponent} from "./Components/settings/settings.component";

export const routes: Routes = [
  {path: 'landing-page', component: LandingPageComponent},
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent},
  {path: 'catagotchi', component: CatagotchiComponent },
  {path: 'settings', component: SettingsComponent},
  {path: '', redirectTo: '/landing-page', pathMatch: 'full' } //redirect to first component
];

