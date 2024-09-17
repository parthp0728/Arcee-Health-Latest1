import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../language.service';  // Import Language Service

@Component({
  selector: 'app-cervical-cancer',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule
  ],
  templateUrl: './cervical-cancer.component.html',
  styleUrls: ['./cervical-cancer.component.scss']
})
export class CervicalCancerComponent implements OnInit {
  cervicalCancerForm!: FormGroup;
  displayRecommendation = false;
  title = 'Your Personalized Recommendation';
  test = false;
  no_test = false;
  unknown = false;
  currentLanguage: string = 'en';  // Default language
  translations: any = {};  // For storing translations

  constructor(private fb: FormBuilder, private languageService: LanguageService) {}

  ngOnInit(): void {
    this.cervicalCancerForm = this.fb.group({
      gender: ['', Validators.required],
      age: [18, [Validators.required, Validators.min(0), Validators.max(100)]],
    });

    // Subscribe to language changes
    this.languageService.currentLanguage$.subscribe(language => {
      this.currentLanguage = language;
      this.loadTranslations(language);
    });
  }

  // Load translations dynamically
  loadTranslations(language: string): void {
    this.languageService.loadTranslations(language).subscribe((translations: any) => {
      this.translations = translations;
    });
  }

  onSubmit(): void {
    if (this.cervicalCancerForm.valid) {
      const formData = this.cervicalCancerForm.value;
      console.log('Form Submitted', formData);

      const age = formData.age;
      const gender = formData.gender;

      this.no_test = false;
      this.test = false;
      this.unknown = false;

      if (gender === 'male') {
        this.unknown = true;
      } else {
        if (age > 65) {
          this.no_test = true;
        } else if (age >= 25 && age <= 65) {
          this.test = true;
        } else {
          this.no_test = true;
        }
      }

      this.displayRecommendation = true;
    }
  }

  resetForm(): void {
    this.cervicalCancerForm.reset({
      gender: '',
      age: 18
    });
    this.displayRecommendation = false;
    this.no_test = false;
    this.test = false;
    this.unknown = false;
  }
}
