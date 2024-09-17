import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckbox } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';  // Import Router
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatCheckbox,
    RouterModule,
    CommonModule,
    FormsModule
  ]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;
  currentLanguage: string = 'en'; // Default language
  translations: any = {}; // Add translations property

  constructor(private fb: FormBuilder, private languageService: LanguageService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    // Subscribe to the language changes from LanguageService
    this.languageService.currentLanguage$.subscribe((language: string) => {
      this.currentLanguage = language;
      this.loadTranslations(language); // Load the translations when language changes
    });
  }

  loadTranslations(language: string): void {
    this.languageService.loadTranslations(language).subscribe((translations: any) => {
      this.translations = translations; // Populate translations
    });
  }

  onLanguageChange(event: Event): void {
    const selectedLanguage = (event.target as HTMLSelectElement).value;
    this.languageService.changeLanguage(selectedLanguage); // Update the language globally
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Form Submitted', this.loginForm.value);
    }
  }
}