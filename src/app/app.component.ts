import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { BreastCancerComponent } from './health-screening/breast-cancer/breast-cancer.component';
import { CervicalCancerComponent } from './health-screening/cervical-cancer/cervical-cancer.component';
import { ColonCancerComponent } from './health-screening/colon-cancer/colon-cancer.component';
import { ChlamydiaComponent } from './health-screening/chlamydia/chlamydia.component';
import { VaccinationComponent } from './health-screening/vaccination/vaccination.component';
import { CareForOlderAdultsComponent } from './health-screening/care-for-older-adults/care-for-older-adults.component';
import { AppThemeService } from './app-theme.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

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
    CareForOlderAdultsComponent,
    MatSlideToggleModule,
    MatIconModule,
    FormsModule
  ]
})
export class AppComponent {
  title = 'Arcee-Health-Latest';
  
  constructor(public themeService: AppThemeService) {}

  toggleTheme() {
    this.themeService.toggleTheme();  // Call the method from the service
  }

  get currentIcon(): string {
    return this.themeService.currentTheme === 'dark' ? 'dark_mode' : 'light_mode';
  }
}
