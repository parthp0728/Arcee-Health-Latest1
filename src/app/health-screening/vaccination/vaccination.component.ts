import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
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
      severeCondition: ['', Validators.required],
      closeContact: ['', Validators.required],
      fluVaccine: ['', Validators.required],
      allergies: ['', Validators.required],
      checkAllThatApply: this.fb.array(this.checkOptions.map(() => this.fb.control(false)))
    });

    // Subscribe to language changes
    this.languageService.currentLanguage$.subscribe(language => {
      this.currentLanguage = language;
      this.loadTranslations(language);
    });
  }

  loadTranslations(language: string): void {
    this.languageService.loadTranslations(language).subscribe((translations: any) => {
      this.translations = translations;
    });
  }

  onSubmit(): void {
    if (this.vaccinationForm.valid) {
      const formData = this.vaccinationForm.value;
      console.log('Form Submitted', formData);
      // Implement your form submission logic here, e.g., sending data to a server
    }
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
