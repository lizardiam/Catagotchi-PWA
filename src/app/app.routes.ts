import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {CatagotchiComponent} from "./catagotchi/catagotchi.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'catagotchi', component: CatagotchiComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' } //redirect to first component
];

