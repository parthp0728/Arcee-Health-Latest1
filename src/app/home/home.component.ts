import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { LanguageService } from '../language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatToolbarModule
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  currentLanguage: string = 'en';  // Default language is English
  private languageSubscription!: Subscription;

  constructor(private languageService: LanguageService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to language changes
    this.languageSubscription = this.languageService.currentLanguage$.subscribe(language => {
      this.currentLanguage = language;  // Update the language dynamically
      this.translatePageContent();
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe when component is destroyed to prevent memory leaks
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  // Logic to translate page content based on the current language
  translatePageContent() {
    if (this.currentLanguage === 'es') {
      // Spanish translations
      console.log('Translated to Spanish');
      // Here you can apply logic to update the HTML content based on Spanish language
    } else {
      // English translations (default)
      console.log('Translated to English');
      // Here you can apply logic to update the HTML content based on English language
    }
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
