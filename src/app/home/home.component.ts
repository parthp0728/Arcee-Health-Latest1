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
  translations: any = {}; // Store the translations
  private languageSubscription!: Subscription;

  constructor(private languageService: LanguageService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to language changes
    this.languageSubscription = this.languageService.currentLanguage$.subscribe(language => {
      this.currentLanguage = language;  // Update the language dynamically
      this.loadTranslations(language);
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe when component is destroyed to prevent memory leaks
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  // Load translations for the current language
  loadTranslations(language: string): void {
    this.languageService.loadTranslations(language).subscribe((translations: any) => {
      this.translations = translations;
    });
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
