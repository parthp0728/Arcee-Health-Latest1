import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../language.service';

@Component({
  selector: 'app-breast-cancer',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './breast-cancer.component.html',
  styleUrls: ['./breast-cancer.component.scss']
})
export class BreastCancerComponent implements OnInit {
  breastCancerForm!: FormGroup;
  currentLanguage: keyof typeof this.medicalConditions = 'en'; // Default language is English
  translations: any = {}; // Store the translations

  // Medical conditions in English and Spanish
  medicalConditions: { en: string[], es: string[] } = {
    en: [
      'BRCA1/2 mutation',
      'Radiation therapy to chest between ages 10-30',
      'Li-Fraumeni syndrome',
      'Cowden syndrome',
      'Bannayan-Riley-Ruvalcaba syndrome',
      'Family history of first-degree relative with any of the above',
    ],
    es: [
      'Mutación BRCA1/2',
      'Radioterapia en el pecho entre los 10-30 años',
      'Síndrome de Li-Fraumeni',
      'Síndrome de Cowden',
      'Síndrome de Bannayan-Riley-Ruvalcaba',
      'Antecedentes familiares de un pariente de primer grado con alguno de los anteriores',
    ]
  };

  constructor(private fb: FormBuilder, private languageService: LanguageService) {}

  ngOnInit(): void {
    this.breastCancerForm = this.fb.group({
      gender: ['', Validators.required],
      age: [30, [Validators.required, Validators.min(30), Validators.max(100)]],
      medicalHistory: this.fb.array(this.medicalConditions['en'].map(() => this.fb.control(false))), // Default to English
    });

    // Subscribe to the language changes
    this.languageService.currentLanguage$.subscribe((language: string) => {
      this.currentLanguage = language as keyof typeof this.medicalConditions; // Cast to keyof
      this.updateMedicalConditions(); // Update the form with the new language conditions
      this.loadTranslations(language);
    });
  }

  // Load translations dynamically
  loadTranslations(language: string): void {
    this.languageService.loadTranslations(language).subscribe((translations: any) => {
      this.translations = translations;
    });
  }

  updateMedicalConditions(): void {
    const medicalHistoryArray = this.breastCancerForm.get('medicalHistory') as FormArray;
    medicalHistoryArray.clear();
    this.medicalConditions[this.currentLanguage].forEach(() => {
      medicalHistoryArray.push(this.fb.control(false));
    });
  }

  onSubmit(): void {
    if (this.breastCancerForm.valid) {
      const formData = this.breastCancerForm.value;
      console.log('Form Submitted', formData);
      const selectedConditions = this.breastCancerForm.value.medicalHistory
        .map((checked: boolean, i: number) => (checked ? this.medicalConditions[this.currentLanguage][i] : null))
        .filter((v: any) => v !== null);

      formData.medicalHistory = selectedConditions;
      const recommendation = this.getRecommendation(formData);
      console.log('Recommendation:', recommendation);
    }
  }

  onClear(): void {
    this.breastCancerForm.reset({
      gender: '',
      age: 30,
      medicalHistory: this.fb.array(this.medicalConditions[this.currentLanguage].map(() => this.fb.control(false))),
    });
  }

  getRecommendation(formData: any): string {
    const { gender, age, medicalHistory } = formData;

    if (gender !== 'female') {
      return this.currentLanguage === 'en'
        ? 'Breast cancer screening recommendations are primarily targeted towards females. Please consult with your healthcare provider for personalized advice.'
        : 'Las recomendaciones de detección de cáncer de mama están dirigidas principalmente a mujeres. Consulte a su proveedor de atención médica para obtener asesoramiento personalizado.';
    }

    const isHighRisk = medicalHistory && medicalHistory.length > 0;

    if (isHighRisk && age >= 30) {
      return this.currentLanguage === 'en'
        ? 'Annual mammogram and breast MRI recommended.'
        : 'Se recomienda una mamografía anual y una resonancia magnética de los senos.';
    } else if (age >= 40 && age <= 44) {
      return this.currentLanguage === 'en'
        ? 'You have the option to start annual mammograms.'
        : 'Tiene la opción de comenzar con mamografías anuales.';
    } else if (age >= 45 && age <= 54) {
      return this.currentLanguage === 'en'
        ? 'Annual mammogram recommended.'
        : 'Se recomienda una mamografía anual.';
    } else if (age >= 55) {
      return this.currentLanguage === 'en'
        ? 'Mammogram recommended every 1-2 years based on your preference and doctor’s advice.'
        : 'Se recomienda una mamografía cada 1-2 años según su preferencia y el consejo de su médico.';
    } else {
      return this.currentLanguage === 'en'
        ? 'Regular screening is not typically recommended at your age. Consult with your healthcare provider for more information.'
        : 'La detección regular no se recomienda típicamente a su edad. Consulte con su proveedor de atención médica para obtener más información.';
    }
  }
}
