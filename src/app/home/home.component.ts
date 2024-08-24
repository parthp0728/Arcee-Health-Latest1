import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';  // Import Router

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatToolbarModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private router: Router) {  // Inject Router
  }

  goToBreastCancer(): void{
    this.router.navigate(['/breastcancer']);
  }

  goToColonCancer(): void{
    this.router.navigate(['/colon-cancer']);
  }

  goToCervicalCancer(): void{
    this.router.navigate(['/cervical-cancer']);
  }

  goToChlamydia(): void{
    this.router.navigate(['/chlamydia']);
  }

  goToVaccination(): void{
    this.router.navigate(['/vaccination']);
  }

  goToOldCare(): void{
    this.router.navigate(['/care-for-older-adults']);
  }

}
