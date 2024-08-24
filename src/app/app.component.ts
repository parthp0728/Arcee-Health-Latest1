import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component'; // Import HomeComponent
import { BreastCancerComponent } from './health-screening/breast-cancer/breast-cancer.component';
import { CervicalCancerComponent } from './health-screening/cervical-cancer/cervical-cancer.component';
import { ColonCancerComponent } from './health-screening/colon-cancer/colon-cancer.component';
import { ChlamydiaComponent } from './health-screening/chlamydia/chlamydia.component';
import { VaccinationComponent } from './health-screening/vaccination/vaccination.component';
import { CareForOlderAdultsComponent } from './health-screening/care-for-older-adults/care-for-older-adults.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    BreastCancerComponent,
    CervicalCancerComponent,
    ColonCancerComponent,
    ChlamydiaComponent,
    VaccinationComponent,
    CareForOlderAdultsComponent
  ]
})
export class AppComponent {
  title = 'Arcee-Health-Latest';
}
