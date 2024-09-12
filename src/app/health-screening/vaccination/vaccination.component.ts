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

  checkOptions = [
    { key: "no_tdap_after_11", label: "I did NOT receive Tdap at or after age 11" },
    { key: "no_dpt_vaccination", label: "I did NOT receive primary vaccination for DPT (diphtheria, pertussis, and tetanus)" },
    { key: "not_sure_tdap", label: "I am NOT sure about my Tdap vaccination history" },
    { key: "non_pregnant_no_rubella", label: "Non-pregnant (childbearing) with NO evidence of Rubella immunity" },
    { key: "lab_evidence_immunity", label: "Lab evidence of immunity or disease OR diagnoses of disease with lab evidence of immunity OR documentation of receipt of MMR" },
    { key: "student_healthcare_worker", label: "I am a student in postsecondary education OR international traveler OR household or close contacts of immunocompromised patients" },
    { key: "healthcare_personnel", label: "I am a healthcare personnel" }
  ];

  constructor(private fb: FormBuilder) {}

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
