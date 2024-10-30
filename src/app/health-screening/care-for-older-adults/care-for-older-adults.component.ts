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
  selector: 'app-care-for-older-adults',
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
  templateUrl: './care-for-older-adults.component.html',
  styleUrls: ['./care-for-older-adults.component.scss']
})
export class CareForOlderAdultsComponent implements OnInit {
  oldAgeForm!: FormGroup;
  displayRecommendation = false;
  title = 'Your Personalized Recommendation';
  showOldAge = false;
  currentLanguage: string = 'en';  // Default to English
  translations: any = {};  // For storing the translation keys

  age: number = 50;
  recommendation: string = '';
  genderOptions: any[] = [
    {label: "Female", value: "Female"},
    {label: "Male", value: "Male"}
]; 
  disclaimer1: string  = `You will be asked to respond to questions which will ask you for personal information and information
  related to your health history. The responses on the questionnaire will be used to provide general recommendations
  on care for older age adults measures you should consider getting in consultation with your primary care physician.`;
  disclaimer2: string = `The questionnaire is NOT a substitute for professional medical care.`;
  disclaimer3: string = `This questionnaire primarily targets healthy individuals with no known underlying health conditions.
  Start by answering the following questions`;

  constructor(private fb: FormBuilder, private languageService: LanguageService) {}

  ngOnInit(): void {
    this.oldAgeForm = this.fb.group({
      gender: ['', Validators.required],
      age: [50, [Validators.required, Validators.min(50), Validators.max(100)]],
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
    console.log("Form Submitted!");
  
    if (this.oldAgeForm.valid) {
      const formData = this.oldAgeForm.value;
      const age = formData.age;
      const gender = formData.gender?.label;  // Optional chaining in case gender is not provided
      let title = 'Average Risk Screening';
      let recommendation = 'Hooray, no recommendation at this time! Always reach out to your primary care provider for any further questions. Check back with us in the future!';
  
      // Simple decision logic for displaying recommendations
      const showOldAge = age >= 66;
  
      // Open modal with the appropriate flag and recommendation
      this.openModal(showOldAge, recommendation);
    }
  }
  
  openModal(showOldAge: boolean, recommendation: string): void {
    this.displayRecommendation = true;  // Show the recommendation section
    this.showOldAge = showOldAge;  // Flag to indicate if the old age condition is met
    this.recommendation = recommendation;  // Set the recommendation text
  }  

  resetForm(): void {
    this.oldAgeForm.reset({
      gender: '',
      age: 50
    });
    this.displayRecommendation = false;
    this.showOldAge = false;
  }
}
