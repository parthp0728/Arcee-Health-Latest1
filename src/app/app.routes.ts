import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { MainLayoutComponent } from './main-layout/main-layout.component'; // Import MainLayoutComponent
import { HomeComponent } from './home/home.component'; 
import { BreastCancerComponent } from './health-screening/breast-cancer/breast-cancer.component';
import { CervicalCancerComponent } from './health-screening/cervical-cancer/cervical-cancer.component';
import { ColonCancerComponent } from './health-screening/colon-cancer/colon-cancer.component';
import { ChlamydiaComponent } from './health-screening/chlamydia/chlamydia.component';
import { VaccinationComponent } from './health-screening/vaccination/vaccination.component';
import { CareForOlderAdultsComponent } from './health-screening/care-for-older-adults/care-for-older-adults.component';
import { ProfileComponent } from './profile/profile.component'; 

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  
  // All routes inside MainLayoutComponent
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent }, 
      { path: 'breastcancer', component: BreastCancerComponent },
      { path: 'cervical-cancer', component: CervicalCancerComponent },
      { path: 'colon-cancer', component: ColonCancerComponent },
      { path: 'chlamydia', component: ChlamydiaComponent },
      { path: 'vaccination', component: VaccinationComponent },
      { path: 'care-for-older-adults', component: CareForOlderAdultsComponent },
      { path: 'profile', component: ProfileComponent }
    ]
  },
  
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
