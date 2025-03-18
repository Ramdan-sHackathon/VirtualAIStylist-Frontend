import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { WardrobeComponent } from './wardrobe/wardrobe.component';
import { userGuard } from './core/guards/user.guard';

export const routes: Routes = [
  // Home Page
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: 'Home Page', canActivate: [userGuard] },
  // Register Page
  { path: 'register', component: RegisterComponent, title: 'Register' },
  // Login Page
  { path: 'login', component: LoginComponent, title: 'Login' },
  // Wardrobe
  { path: 'wardrobe', component: WardrobeComponent, title: 'My Wardrobe', canActivate: [userGuard] }
];
