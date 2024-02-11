import { Routes } from '@angular/router';
import {LoginComponent} from "./Components/login/login.component";
import {CatagotchiComponent} from "./Components/catagotchi/catagotchi.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'catagotchi', component: CatagotchiComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' } //redirect to first component
];

