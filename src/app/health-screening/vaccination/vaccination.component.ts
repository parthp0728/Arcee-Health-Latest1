import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, ValidatorFn, AbstractControl, FormArray } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LanguageService } from '../../language.service';  // Import LanguageService

@Component({
  selector: 'app-vaccination',
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
  templateUrl: './vaccination.component.html',
  styleUrls: ['./vaccination.component.scss']
})
export class VaccinationComponent implements OnInit {
  vaccinationForm!: FormGroup;
  currentLanguage: string = 'en';  // Default language is English
  translations: any = {};  // Holds the translations

  age: number = 18;
  isSubmitting: boolean = false;
  genderOptions: any[] = [
    {label: "Female", value: "Female"},
    {label: "Male", value: "Male"}
  ];
  disclaimer1: string = `You will be asked to respond to questions which will ask you for personal information and information
  related to your health history. The responses on the questionnaire will be used to provide general recommendations
  on vaccinations you should consider getting in consultation with your primary care physician.`;
  disclaimer2: string = `The questionnaire is NOT a substitute for professional medical care.`;
  disclaimer3: string = `This questionnaire primarily targets healthy individuals with no known underlying health conditions.
  Start by answering the following questions`;
  allergy: string = `Do you have any of the following allergies?`;
  allergyOptions: any[] = [
    {key: "1", name: "Egg allergy"},
    {key: "2", name: "Shell fish allergy"},
    {key: "3", name: "None"},
  ];
  condition: string = `Are you pregnant, or have HIV or have any severe immunocompromised condition?`;
  influenzaCondition: string = `Did you get in close contact or are you a caregiver of severly immunocompromised person?`;
  influenzaCondition2: string = `Did you get flu vaccine in last 48 hrs or have cochlear implant or have sickle sell anemia or history of spleen removal?`;
  selectedTdap: any;
  options: any[] = [
    {key: "1", name: "Yes"},
    {key: "2", name: "No"},
    {key: "3", name: "I am not sure."}
  ];
  influenzaOptions: any[] = [
    {key: "1", name: "Yes"},
    {key: "2", name: "No"},
    {key: "3", name: "I am not sure."}
  ];
  influenzaOptions2: any[] = [
    {key: "1", name: "Yes"},
    {key: "2", name: "No"},
    {key: "3", name: "I am not sure."}
  ];
  selectedCondition: any;
  selectedInfluenzaCondition: any;
  selectedInfluenzaCondition2: any;
  apply: string = `Check all that apply`;
  applyOptions: any[] = [
    {key: "1", name: "I did NOT receive Tdap at or after age 11"},
    {key: "2", name: "I did NOT receive primary vaccination for DPT(diphtheria, pertussis and tetanus)"},
    {key: "3", name: "I am NOT sure about my Tdap vaccination history."},
    {key: "4", name: "Non pregnant (childbearing) with NO evidence of Rubella immunity."},
    {key: "5", name: "Lab evidence of immunity or disease OR diagnoses of disease with lab evidence of immunity OR documentation of receipt of MMR."},
    {key: "6", name: "I am a student in postsecondary education OR international traveler OR household or close contacts of immunocompromised patients."},
    {key: "7", name: "I am a healthcare personnel."},      
  ];
  recommendations: string[] = [];
  displayRecommendation: boolean = false;
  title: string = '';
  isCollapsed: boolean = false;
  currentYear: number = (new Date()).getFullYear();

  checkOptions = [
    { key: "no_tdap_after_11", label: "I did NOT receive Tdap at or after age 11", labelEs: "No recibí Tdap a los 11 años o después" },
    { key: "no_dpt_vaccination", label: "I did NOT receive primary vaccination for DPT (diphtheria, pertussis, and tetanus)", labelEs: "No recibí la vacunación primaria contra DPT (difteria, tos ferina y tétanos)" },
    { key: "not_sure_tdap", label: "I am NOT sure about my Tdap vaccination history", labelEs: "No estoy seguro de mi historial de vacunación contra el Tdap" },
    { key: "non_pregnant_no_rubella", label: "Non-pregnant (childbearing) with NO evidence of Rubella immunity", labelEs: "No embarazada (edad fértil) sin evidencia de inmunidad contra la rubéola" },
    { key: "lab_evidence_immunity", label: "Lab evidence of immunity or disease OR diagnoses of disease with lab evidence of immunity OR documentation of receipt of MMR", labelEs: "Evidencia de laboratorio de inmunidad o enfermedad O diagnóstico de enfermedad con evidencia de laboratorio de inmunidad O documentación de recibo de MMR" },
    { key: "student_healthcare_worker", label: "I am a student in postsecondary education OR international traveler OR household or close contacts of immunocompromised patients", labelEs: "Soy un estudiante de educación postsecundaria O viajero internacional O familiar o contacto cercano de pacientes inmunocomprometidos" },
    { key: "healthcare_personnel", label: "I am a healthcare personnel", labelEs: "Soy personal sanitario" }
  ];

  constructor(private fb: FormBuilder, private languageService: LanguageService) {}

  ngOnInit(): void {
    this.vaccinationForm = this.fb.group({
      gender: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      severeCondition: [''],
      closeContact: [''],
      fluVaccine: [''],
      allergies: [''],
      checkAllThatApply: this.fb.array(this.checkOptions.map(() => this.fb.control(false)), atLeastOneCheckboxCheckedValidator(1)), // Add validator here
      tdap: this.fb.array(this.checkOptions.map(() => this.fb.control(false))),
      condition: [''],
      influenzaCondition: [''],
      influenzaCondition2: ['']
    });

    // Subscribe to language changes
    this.languageService.currentLanguage$.subscribe(language => {
      this.currentLanguage = language;
      this.loadTranslations(language);
    });

    // Trigger revalidation of the form
    this.vaccinationForm.updateValueAndValidity();
  }

  loadTranslations(language: string): void {
    this.languageService.loadTranslations(language).subscribe((translations: any) => {
      this.translations = translations;
    });
  }

  onSubmit(): void {
    console.log('Form Submitted. Checking form validity...');
    console.log('Form Valid:', this.vaccinationForm.valid);
    console.log('Form Values:', this.vaccinationForm.value);

    // Log individual form controls
    console.log('Gender Valid:', this.vaccinationForm.get('gender')?.valid);
    console.log('Age Valid:', this.vaccinationForm.get('age')?.valid);
    console.log('Severe Condition Valid:', this.vaccinationForm.get('severeCondition')?.valid);
    console.log('Close Contact Valid:', this.vaccinationForm.get('closeContact')?.valid);
    console.log('Flu Vaccine Valid:', this.vaccinationForm.get('fluVaccine')?.valid);
    console.log('Allergies Valid:', this.vaccinationForm.get('allergies')?.valid);
    console.log('CheckAllThatApply Valid:', this.vaccinationForm.get('checkAllThatApply')?.valid);
    console.log('Tdap Valid:', this.vaccinationForm.get('tdap')?.valid);

    // Log entire form errors if any exist
    console.log('Form Errors:', this.vaccinationForm.errors);
    
    // Check each form control for errors and log them
    Object.keys(this.vaccinationForm.controls).forEach(control => {
        const controlErrors = this.vaccinationForm.get(control)?.errors;
        if (controlErrors) {
            console.log(`Errors in ${control}:`, controlErrors);
        }
    });

    if (this.vaccinationForm.valid) {
        this.isSubmitting = true;
        this.getRecommendation(this.vaccinationForm);
        this.isSubmitting = false;
        this.displayRecommendation = this.recommendations.length > 0;
        console.log('Recommendations:', this.recommendations);
        console.log('Display Recommendation:', this.displayRecommendation);
    } else {
        console.log('Form is invalid. Please complete all required fields.');
        this.vaccinationForm.markAllAsTouched();  // Visually highlight invalid fields
    }
 }

  getRecommendation(vaccinationForm: FormGroup) {
    const age = vaccinationForm.get('age')?.value;
    const allergies = vaccinationForm.get('allergies')?.value;
    const severeCondition = vaccinationForm.get('severeCondition')?.value;
    const closeContact = vaccinationForm.get('closeContact')?.value;
    const fluVaccine = vaccinationForm.get('fluVaccine')?.value;
    const checkAllThatApply = vaccinationForm.get('checkAllThatApply') as FormArray;

    let recommendations: string[] = [];
    const recommendation1 = `Single dose Annual Influenza inactivated (IIV)`;
    const recommendation2 = `Single dose Annual Influenza recombinant (RIV)`;
    const recommendation3 = `Single dose Annual Influenza live attenuated (LAIV)`;
    const recommendation4 = `One dose of Tdap, then Td booster every 10 years`;
    const recommendation5 = `One dose of Tdap, followed by one dose of Td after 4 weeks and another dose of Td 6-12 months after the last Td dose and a booster every 10 years`;
    const recommendation6 = `Please refer to your Primary Care Physician`;
    const recommendation7 = `One dose of MMR indicated`;

    let title = `Vaccinations required`;

    // Sample logic for recommendations based on age, allergy, and conditions
    if (age < 18 || allergies === 'egg_allergy') {
        recommendations.push(recommendation6 + " for Influenza vaccination");
    } else if (severeCondition === 'yes' || closeContact === 'yes' || fluVaccine === 'yes') {
        recommendations.push(recommendation1, recommendation2);
    } else if (18 < age && age < 50) {
        recommendations.push(recommendation1, recommendation2, recommendation3);
    } else {
        recommendations.push(recommendation2, recommendation3);
    }

    // Logic for Tdap and MMR recommendations
    if (checkAllThatApply.controls[0].value) {
        recommendations.push(recommendation4);
    } else if (checkAllThatApply.controls[1].value || checkAllThatApply.controls[2].value) {
        recommendations.push(recommendation5);
    }

    const bornBefore1957 = (this.currentYear - age) >= 1957;
    if (bornBefore1957) {
        recommendations.push(recommendation7);
    }

    if (recommendations.length > 0) {
        this.openModal(title, recommendations);
    } else {
        this.displayRecommendation = false;  // Prevent empty recommendation display
    }
  }

openModal(title: string, recommendations: string[]): void { // Add explicit types for 'title' and 'recommendations'
    this.displayRecommendation = true;
    this.recommendations = recommendations;
    this.title = title;
}

  onClear(): void {
    this.vaccinationForm.reset({
      gender: '',
      age: null,
      severeCondition: '',
      closeContact: '',
      fluVaccine: '',
      allergies: '',
      checkAllThatApply: this.checkOptions.map(() => false)
    });
  }
}

function atLeastOneCheckboxCheckedValidator(minRequired = 1): ValidatorFn {
  return (formArray: AbstractControl) => {
      const checked = (formArray as FormArray).controls.filter((control) => control.value).length;
      console.log('Checkboxes checked:', checked);  // Log checked boxes count
      return checked >= minRequired ? null : { required: true };
  };
}
