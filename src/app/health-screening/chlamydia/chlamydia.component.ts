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

  disclaimer1: string = `You will be asked to respond to questions which will ask you for personal information and information
  related to your health history. The responses on the questionnaire will be used to provide general recommendations
  on chlamydia preventive measures you should consider getting in consultation with your primary care physician.`;
  disclaimer2: string = `The questionnaire is NOT a substitute for professional medical care.`;
  disclaimer3: string = `This questionnaire primarily targets healthy individuals with no known underlying health conditions.
  Start by answering the following questions`;
  genderOptions: any[] = [
    {label: "Female", value: "Female"},
    {label: "Male", value: "Male"}
];
  isCollapsed: boolean = false;
  pregnant: string = `Are you pregnant?`;
  riskFactor: string = `Do you have any additional risk factors? `;
  riskFactorTooltip: string = `Risk factors such as a new or multiple partners, or a sex partner who has sexually 
  transmitted infection`;
  yesNoOptions: any[] = [
    {name: 'Yes', key: 'Yes'},
    {name: 'No', key: 'No'},
];
  riskFlag: boolean = false;
  sexualActivity: string = `Are you currently sexually active?`;
  selectedAge: number = 18;
  selectedGender: any;
  selectedPregnant: any;
  selectedRiskFactor: any;
  selectedSexualActivity: any;

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

  onSubmit(): void {
    if (this.chlamydiaForm.valid) {
      const formData = this.chlamydiaForm.value;
      console.log('Form Submitted', formData);

      // Get the recommendation and title based on the form data
      const { title, recommendation } = this.getRecommendation(formData);

      // Show the modal with the recommendation and title
      this.openModal(title, recommendation);
    }
}

getRecommendation(formData: any): { title: string, recommendation: string } {
    const { age, gender, isSexuallyActive, isRiskFactor, isPregnant } = formData;
    let recommendation = '';
    let title = 'No Screening Required!';

    const recommendation1 = `You need to screen during the first prenatal visit and third trimester. If you want to learn more about either tests, 
        you can read more about them.`;
    const recommendation2 = `You need to have annual chlamydia screening. If you want to learn more about either tests, 
        you can read more about them.`;
    const recommendation3 = `Hooray, no testing needed at the moment. Always reach out to your primary care provider for 
        any further questions. Check back with us in the future!`;
    const recommendation4 = `Primary HPV test every 5 years OR HPV test and Pap every 5 years OR
        Pap every 3 years. If you want to learn more about either tests, you can read more about them.`;

    // Gender-specific logic
    if (gender == 'Male') {
        recommendation = recommendation3;
    } else {
        // Female or other genders
        if (age < 25) {
            if (isPregnant == 'Yes') {
                recommendation = recommendation1;
                title = 'High Risk Screening';
            } else {
                if (isRiskFactor == 'Yes') {
                    recommendation = recommendation2;
                    title = 'High Risk Screening';
                } else {
                    recommendation = recommendation3;
                }
            }
        } else {
            if (isPregnant == 'Yes') {
                recommendation = recommendation1;
                title = 'High Risk Screening';
            } else if (isRiskFactor == 'Yes') {
                recommendation = recommendation2;
                title = 'High Risk Screening';
            } else {
                recommendation = recommendation3;
            }
        }
    }

    return { title, recommendation };
}

openModal(title: string, recommendation: string): void {
    this.displayRecommendation = true;
    this.recommendation = recommendation;
    this.title = title;
}
}
