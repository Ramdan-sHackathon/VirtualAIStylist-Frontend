import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { WardrobeComponent } from './wardrobe/wardrobe.component';
import { userGuard } from './core/guards/user.guard';

export const routes: Routes = [
  // Home Page
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: 'Virtual Ai Stylist | Home', canActivate: [userGuard] },
  // Register Page
  { path: 'register', component: RegisterComponent, title: 'Virtual AI Stylist | Register'},
  // Login Page
  { path: 'login', component: LoginComponent, title: 'Virtual Ai Stylist | Login' },
  // Wardrobe
  { path: 'wardrobe', component: WardrobeComponent, title: 'Virtual Ai Stylist | My Wardrobe', canActivate: [userGuard] }
];
