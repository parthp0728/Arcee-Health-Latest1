import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'; // For the button used in the menu
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
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
    MatToolbarModule,
    MatMenuModule, // Import MatMenuModule for the menu functionality
    MatIconModule, // Import MatIconModule for the three-dot icon
    MatButtonModule, // Import MatButtonModule for the menu button
    MatListModule,
    RouterModule
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  currentLanguage: string = 'en';  // Default language is English
  translations: any = {}; // Store the translations
  private languageSubscription!: Subscription;
  navItems = [
    { name: 'Screenings', icon: 'menu_book' },
    { name: 'Help Desk', icon: 'help_outline' },
    { name: 'My Profile', icon: 'person' },
    { name: 'Settings', icon: 'star' },
    { name: 'Logout', icon: 'people' }
  ];

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

  isActive(route: string): boolean {
    return this.router.url === route;
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
