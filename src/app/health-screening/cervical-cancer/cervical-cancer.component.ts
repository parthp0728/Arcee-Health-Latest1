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
  title = 'Your Personalized Recommendation';
  currentLanguage: string = 'en';  // Default language
  translations: any = {};  // For storing translations

  cervicalCancerForm!: FormGroup;
  displayRecommendation: boolean = false;
  disclaimer1: string = `You will be asked to respond to questions which will ask you for personal information and information
  related to your health history. The responses on the questionnaire will be used to provide general recommendations
  on chlamydia preventive measures you should consider getting in consultation with your primary care physician.`;;
  disclaimer2: string = `The questionnaire is NOT a substitute for professional medical care.`;;
  disclaimer3: string = `This questionnaire primarily targets healthy individuals with no known underlying health conditions.
  Start by answering the following questions`;;
  genderOptions: any[] = [
    {label: "Female", value: "Female"},
    {label: "Male", value: "Male"}
];
  isCollapsed: boolean = false;
  selectedAge: number = 18;
  no_test: boolean = false;
  unknown: boolean = false;
  test: boolean = false;

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
  
      // Reset the flags
      this.no_test = false;
      this.test = false;
      this.unknown = false;
  
      // Use gender.label if necessary, otherwise just check gender directly
      if (gender.label && gender.label === 'Male' || gender === 'male') {
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
  
      // Show the recommendation modal or section
      this.openModal();
    }
  }
  
  openModal(): void {
    this.displayRecommendation = true;
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
