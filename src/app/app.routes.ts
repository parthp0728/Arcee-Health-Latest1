import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'; // Ensure this path is correct
import { RegistrationComponent } from './registration/registration.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Redirect to /login by default
  { path: 'register', component: RegistrationComponent }
];
