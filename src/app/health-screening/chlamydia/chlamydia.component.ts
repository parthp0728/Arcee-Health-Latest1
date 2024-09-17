import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../language.service';  // Import LanguageService

@Component({
  selector: 'app-chlamydia-screening',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule
  ],
  templateUrl: './chlamydia.component.html',
  styleUrls: ['./chlamydia.component.scss']
})
export class ChlamydiaComponent implements OnInit {
  chlamydiaForm!: FormGroup;
  displayRecommendation = false;
  title = 'Your Personalized Recommendation';
  recommendation = '';
  age = 0;
  currentLanguage: string = 'en';  // Default language is English
  translations: any = {};  // To store the translation strings

  constructor(private fb: FormBuilder, private languageService: LanguageService) {}

  ngOnInit(): void {
    this.chlamydiaForm = this.fb.group({
      gender: ['', Validators.required],
      age: [18, [Validators.required, Validators.min(0), Validators.max(100)]],
      isSexuallyActive: [null],
      isRiskFactor: [null],
      isPregnant: [null]
    });

    // Update questions when age changes
    this.chlamydiaForm.get('age')?.valueChanges.subscribe((value) => {
      this.age = value;
    });

    this.updateQuestions();

    // Subscribe to language changes
    this.languageService.currentLanguage$.subscribe((language) => {
      this.currentLanguage = language;
      this.loadTranslations(language);
    });
  }

  loadTranslations(language: string): void {
    this.languageService.loadTranslations(language).subscribe((translations: any) => {
      this.translations = translations;
    });
  }

  updateQuestions(): void {
    this.age = this.chlamydiaForm.get('age')?.value;
  }

  onSubmit(): void {
    if (this.chlamydiaForm.valid) {
      const formData = this.chlamydiaForm.value;
      console.log('Form Submitted', formData);

      // Determine recommendation logic based on form data
      this.recommendation = this.getRecommendation(formData);
      this.displayRecommendation = true;
    }
  }

  resetForm(): void {
    this.chlamydiaForm.reset({
      gender: '',
      age: 18,
      isSexuallyActive: null,
      isRiskFactor: null,
      isPregnant: null
    });
    this.displayRecommendation = false;
    this.updateQuestions();
  }

  getRecommendation(formData: any): string {
    const { age, gender, isSexuallyActive, isRiskFactor, isPregnant } = formData;

    if (age < 25) {
      if (isPregnant) {
        return this.currentLanguage === 'en' 
          ? 'You need to screen during the first prenatal visit and third trimester.' 
          : 'Debe hacerse un cribado en la primera visita prenatal y en el tercer trimestre.';
      } else if (isSexuallyActive) {
        return this.currentLanguage === 'en' 
          ? 'Annual chlamydia screening is recommended.' 
          : 'Se recomienda un cribado anual de clamidia.';
      } else {
        return this.currentLanguage === 'en' 
          ? 'No testing needed at the moment.' 
          : 'No se necesita prueba en este momento.';
      }
    } else {
      if (isPregnant) {
        return this.currentLanguage === 'en' 
          ? 'You need to screen during the first prenatal visit and third trimester.' 
          : 'Debe hacerse un cribado en la primera visita prenatal y en el tercer trimestre.';
      } else if (isRiskFactor) {
        return this.currentLanguage === 'en' 
          ? 'Annual chlamydia screening is recommended.' 
          : 'Se recomienda un cribado anual de clamidia.';
      } else {
        return this.currentLanguage === 'en' 
          ? 'No testing needed at the moment.' 
          : 'No se necesita prueba en este momento.';
      }
    }
  }
}
