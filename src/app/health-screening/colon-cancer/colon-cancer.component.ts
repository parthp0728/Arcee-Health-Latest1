import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../language.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-colon-cancer',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatRadioModule,
    MatCheckboxModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './colon-cancer.component.html',
  styleUrls: ['./colon-cancer.component.scss']
})
export class ColonCancerComponent implements OnInit {
  colonCancerForm!: FormGroup;
  currentLanguage: 'en' | 'es' = 'en';  // Set a stricter type for currentLanguage
  translations: any = {};  // To store translation strings
  title = '';
  recommendations: string[] = [];
  selectedFamilyConditions: any[] = [];  // Proper initialization

  age: number = 18;
  genderOptions: any[] = [
    { label: "Female", value: "Female" },
    { label: "Male", value: "Male" }
  ];
  
  disclaimer1: string = `You will be asked to respond to questions which will ask you for personal information and information
  related to your health history. The responses on the questionnaire will be used to provide general recommendations
  on colon cancer preventive measures you should consider getting in consultation with your primary care physician.`;
  disclaimer2: string = `The questionnaire is NOT a substitute for professional medical care.`;
  disclaimer3: string = `This questionnaire primarily targets healthy individuals with no known underlying health conditions.
  Start by answering the following questions.`;
  
  selfCondition: string = `Do you have any of the following conditions?`;
  familyCondition: string = `Do any of the following conditions apply?`;
  
  selfConditionOptions = [
    { key: "1", name: { en: "Crohn's disease or ulcerative colitis", es: "Enfermedad de Crohn o colitis ulcerosa" } },
    { key: "2", name: { en: "Familial Adenomatous polyposis (FAP)", es: "Poliposis adenomatosa familiar (FAP)" } },
    { key: "3", name: { en: "Hereditary nonpolyposis colorectal cancer", es: "Cáncer colorrectal hereditario sin poliposis" } },
    { key: "4", name: { en: "None of the above", es: "Ninguna de las anteriores" } }
  ];

  familyConditionOptions = [
    { key: "1", name: { en: "First degree relative below 60 years detected with colorectal cancer", es: "Pariente de primer grado menor de 60 años detectado con cáncer colorrectal" } },
    { key: "2", name: { en: "First degree relative above 60 years detected with colorectal cancer", es: "Pariente de primer grado mayor de 60 años detectado con cáncer colorrectal" } },
    { key: "3", name: { en: "Two or more first-degree relatives detected with colorectal cancer", es: "Dos o más parientes de primer grado detectados con cáncer colorrectal" } },
    { key: "4", name: { en: "Two or more second-degree relatives detected with colorectal cancer", es: "Dos o más parientes de segundo grado detectados con cáncer colorrectal" } },
    { key: "5", name: { en: "None of the above", es: "Ninguna de las anteriores" } }
  ];

  displayRecommendation: boolean = false;

  constructor(private fb: FormBuilder, private languageService: LanguageService) {}

  ngOnInit(): void {
    this.colonCancerForm = this.fb.group({
      gender: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      selfCondition: ['', Validators.required],
      familyCondition: this.fb.array(this.familyConditionOptions.map(() => this.fb.control(false)))  // FormArray for checkboxes
    });    

    // Subscribe to language changes
    this.languageService.currentLanguage$.subscribe((language: string) => {
      if (language === 'en' || language === 'es') {
        this.currentLanguage = language as 'en' | 'es';
        this.loadTranslations(language);
      }
    });
  }

  loadTranslations(language: string): void {
    this.languageService.loadTranslations(language).subscribe((translations: any) => {
      this.translations = translations;
    });
  }

  onSubmit(): void {
    // First, check if the form is valid
    if (this.colonCancerForm.valid) {
      const formData = this.colonCancerForm.value;
      console.log('Form Submitted', formData);
  
      // Call the recommendation function and pass the form data
      this.getRecommendation(this.colonCancerForm);
    }
  }
  
  getRecommendation(colonForm: FormGroup) {
    const age = colonForm.value.age;
    const selfCondition = colonForm.value.selfCondition;
    const familyConditions = colonForm.value.familyCondition; // Get selected family conditions from the form control
    let title = 'High Risk Screening';
    let recommendations: string[] = [];
  
    // Recommendation messages
    const recommendation1 = `Stool DNA every 3 years`;
    const recommendation2 = `Colonoscopy every 10 years`;
    const recommendation3 = `Sigmoidoscopy every 5 years`;
    const recommendation4 = `CT colonoscopy every 5 years`;
    const recommendation5 = `Annual fecal for occult blood (FOBT)`;
    const recommendation6 = `Colorectal cancer screening with colonoscopy every 1-2 years
      with biopsy starting at 8 years after the onset of pancolitis OR 12-15 years after the onset of left-sided colitis`;
    const recommendation7 = `Annual colorectal cancer screening with sigmoidoscopy starting at 10-12 years`;
    const recommendation8 = `Colorectal cancer screening with colonoscopy every 1-2 years starting at either at 20-25 years OR
      10 years younger than age at diagnosis of the youngest affected relative`;
    const recommendation9 = `Colorectal cancer screening with colonoscopy every 5 years starting at either at 40 years
      OR 10 years earlier than age at diagnosis of the youngest affected relative CRC`;
    const recommendation10 = `Colorectal cancer screening with any strategy at 40 years`;
    const noScreening = `Hooray, no testing needed at this time! Always reach out to your primary care physician for any
       further questions. Check back with us in the future!`;
    const noScreeningTitle = `No Screening Required!`;
  
    // Logic for providing recommendations
    if (age >= 45) {
      recommendations = [recommendation1, recommendation2, recommendation3, recommendation4, recommendation5];
      title = 'Average Risk Screening';
    } else if (selfCondition) {
      switch (selfCondition.key) {
        case "1": {
          recommendations = [recommendation6];
          break;
        }
        case "2": {
          recommendations = [recommendation7];
          break;
        }
        case "3": {
          recommendations = [recommendation8];
          break;
        }
        default: {
          recommendations = [noScreening];
          title = noScreeningTitle;
          break;
        }
      }
    } else if (familyConditions.length) {
      switch (this.getKeys(familyConditions)) {
        case "1":
        case "2":
        case "4": {
          recommendations = [recommendation9];
          break;
        }
        case "3": {
          recommendations = [recommendation10];
          break;
        }
        case "1, 3":
        case "2, 4": {
          recommendations = [recommendation9];
          break;
        }
        default: {
          recommendations = [noScreening];
          title = noScreeningTitle;
          break;
        }
      }
    }
  
    // Call to open modal with recommendations
    this.openModal(title, recommendations);
  }
  
  getKeys(familyConditions: any[]): string {
    let keys: string[] = [];
    familyConditions.forEach(condition => keys.push(condition.key));
    return keys.toString();
  }
  
  openModal(title: string, recommendations: string[]): void {
    this.displayRecommendation = true;  // Set this to true to show the recommendation section
    this.recommendations = recommendations;  // Assign recommendations to the component property
    this.title = title;  // Assign title to the component property
    console.log('Recommendations:', this.recommendations);  // Confirm that recommendations exist
}  

  onClear(): void {
    this.colonCancerForm.reset({
      gender: '',
      age: null,
      selfCondition: '',
      familyCondition: []
    });
  }
}
