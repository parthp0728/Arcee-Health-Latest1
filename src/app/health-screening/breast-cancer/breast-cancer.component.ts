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
import { MatSelectChange } from '@angular/material/select';
import { ChangeDetectorRef } from '@angular/core';

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
  age: number = 30;
  showMedicalHistory: boolean = true;
  displayRecommendation: boolean = false;
  disclaimer1: string = `You will be asked to respond to questions which will ask you for personal information and information
    related to your health history. The responses on the questionnaire will be used to provide general recommendations
    on breast cancer preventive measures you should consider getting in consultation with your primary care physician.`;
  disclaimer2: string = `The questionnaire is NOT a substitute for professional medical care.`;
  disclaimer3: string = `This questionnaire primarily targets healthy individuals with no known underlying health conditions.
    Start by answering the following questions`;
  genderOptions: any[] = [
    {label: "Female", value: "Female"},
    {label: "Male", value: "Male"}
];
  isCollapsed: boolean = false;
  selfCondition: string = `Do you have any of the following conditions?`;
  selfConditionOptions: any[] = [
    {
        key: "1",
        name: "BRCA1/2 mutation",
        tooltip: `Also known as BReast CAancer gene, mutation of which such as BRCA 1 & 
BRCA can make some high risk of breast cancer and ovarian cancer and need special screening to detect early cancer`
    },
    {
        key: "2",
        name: "Radiation therapy to chest ages 10-30",
        tooltip: `Never had chest radiation therapy before the age of 30`
    },
    {
        key: "3",
        name: "Li-Fraumeni syndrome",
        tooltip: `Li-Fraumeni syndrome is a genetic disorder that is manifested by a wide range of cancers  that appear 
at an unusually early age  which includes Sarcoma, Breast, Leukemia, and Adrenal Gland (SBLA) cancer syndrome`
    },
    {
        key: "4",
        name: "Cowden syndrome",
        tooltip: `Cowden syndrome (also known as Cowden disease or multiple hamartoma syndrome) is the 
        best-described phenotype within PHTS. Besides multiple hamartomas in a variety of tissues, patients have
         characteristic dermatologic manifestations such as trichilemmomas, oral fibromas, and punctate 
         palmoplantar keratoses, and an increased risk of breast, endometrial, thyroid, kidney, and colorectal cancers`
    },
    {
        key: "5",
        name: "Bannayan-Riley-Ruvalcaba syndrome",
        tooltip: `Bannayan-Riley-Ruvalcaba Info`
    },
    {
        key: "6",
        name: "Family history of first degree relative with any of the above",
        tooltip: `Family history of any of the above conditions in a 1st degree relative (parents, siblings or children)`
    }
];
  recommendation: string = '';
  riskFlag: boolean = false;
  title = 'Arcee Health';
  selectedCondition: any;
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

  constructor(private fb: FormBuilder, private languageService: LanguageService, private cdr: ChangeDetectorRef) {}

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
      this.riskFlag = true;
      const formData = this.breastCancerForm.value;
      const age = formData.age;
      const gender = formData.gender;
      const selectedConditions = formData.medicalHistory
        .map((checked: boolean, i: number) => (checked ? this.medicalConditions[this.currentLanguage][i] : null))
        .filter((v: any) => v !== null);
  
      formData.medicalHistory = selectedConditions;
      console.log('Form Submitted', formData);
  
      let title = 'Average Risk Screening';
      let recommendation = '';
      const recommendation1 = `Hooray, no testing needed at this time! Always reach out to your primary care provider for any further questions. Check back with us in the future!`;
      const recommendation2 = `You are in the average risk category for breast cancer. Please think about option to screen annual mammogram. If you want to learn more about either tests, you can read more about them.`;
      const recommendation3 = `You are in the average risk category for breast cancer. Please think about getting an annual mammogram. If you want to learn more about either tests, you can read more about them.`;
      const recommendation4 = `You are in the average risk category for breast cancer. Please think about getting annual or biannual mammogram. If you want to learn more about either tests, you can read more about them.`;
      const recommendation5 = `You are in the high-risk category for breast cancer. Please think about getting an annual mammogram and breast MRI. If you want to learn more about either tests, you can read more about them.`;
  
      // Gender and medical history check
      if (gender === 'Male') {
        this.riskFlag = false;
        title = "Low Risk Screening";
        recommendation = recommendation1;
      } else {
        if (selectedConditions.length > 0) { // High-risk conditions present
          if (age >= 30) {
            title = "High Risk Screening";
            recommendation = recommendation5;
          } else {
            recommendation = recommendation2;
          }
        } else { // No high-risk conditions, check age
          if (age >= 40 && age <= 44) {
            recommendation = recommendation2;
          } else if (age >= 45 && age <= 54) {
            recommendation = recommendation3;
          } else if (age >= 55) {
            recommendation = recommendation4;
          } else {
            this.riskFlag = false;
            recommendation = recommendation1;
          }
        }
      }
  
      // Open the modal with the recommendation
      this.openModal(title, recommendation);
    }
  }
  
  openModal(title: string, recommendation: string): void {
    console.log('Opening Modal:', title, recommendation);  // Debug log
    this.displayRecommendation = true;
    this.recommendation = recommendation;
    this.title = title;
    this.cdr.detectChanges();  // Optionally force a change detection cycle
  }

  onGenderChange(e: MatSelectChange): void {
    console.log('event:', e);
    console.log(e.value);
    
    // Use lowercase comparison, as the value is 'male' in the template
    if (e.value === 'male') {
      this.showMedicalHistory = false;
    } else {
      this.showMedicalHistory = true;
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
