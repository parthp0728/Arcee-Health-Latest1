import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule
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
    ReactiveFormsModule,  // Make sure ReactiveFormsModule is imported here
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

  selfConditionOptions = [
    { key: "1", name: { en: "Crohn's disease or ulcerative colitis", es: "Enfermedad de Crohn o colitis ulcerosa" } },
    { key: "2", name: { en: "Familial Adenomatous polyposis (FAP)", es: "Poliposis adenomatosa familiar (FAP)" } },
    { key: "3", name: { en: "Hereditary nonpolyposis colorectal cancer", es: "Cáncer colorrectal hereditario sin poliposis" } },
    { key: "4", name: { en: "None of the above", es: "Ninguna de las anteriores" } }
  ];

  familyConditionOptions = [
    { key: "1", name: { en: "First degree relative below 60 years detected with colorectal cancer", es: "Pariente de primer grado menor de 60 años detectado con cáncer colorrectal" } },
    { key: "2", name: { en: "First degree relative above 60 years detected with colorectal cancer", es: "Pariente de primer grado mayor de 60 años detectado con cáncer colorrectal" } },
    { key: "3", name: { en: "Two or more first degree relatives detected with colorectal cancer", es: "Dos o más parientes de primer grado detectados con cáncer colorrectal" } },
    { key: "4", name: { en: "Two or more second degree relatives detected with colorectal cancer", es: "Dos o más parientes de segundo grado detectados con cáncer colorrectal" } },
    { key: "5", name: { en: "None of the above", es: "Ninguna de las anteriores" } }
  ];

  constructor(private fb: FormBuilder, private languageService: LanguageService) {}

  ngOnInit(): void {
    this.colonCancerForm = this.fb.group({
      gender: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      selfCondition: ['', Validators.required],
      familyCondition: []
    });

    // Subscribe to language changes
    this.languageService.currentLanguage$.subscribe((language: String) => {
      if (language === 'en' || language === 'es') {
        this.currentLanguage = language as 'en' | 'es';
      }
    });
  }

  onSubmit(): void {
    if (this.colonCancerForm.valid) {
      const formData = this.colonCancerForm.value;
      console.log('Form Submitted', formData);
      // Implement recommendation logic here
    }
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
