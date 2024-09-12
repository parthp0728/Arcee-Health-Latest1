import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

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
  medicalConditions: string[] = [
    'BRCA1/2 mutation',
    'Radiation therapy to chest between ages 10-30',
    'Li-Fraumeni syndrome',
    'Cowden syndrome',
    'Bannayan-Riley-Ruvalcaba syndrome',
    'Family history of first-degree relative with any of the above'
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.breastCancerForm = this.fb.group({
      gender: ['', Validators.required],
      age: [30, [Validators.required, Validators.min(30), Validators.max(100)]],
      medicalHistory: this.fb.array(this.medicalConditions.map(() => this.fb.control(false)))
    });
  }

  onSubmit(): void {
    if (this.breastCancerForm.valid) {
      const formData = this.breastCancerForm.value;
      console.log('Form Submitted', formData);
      const selectedConditions = this.breastCancerForm.value.medicalHistory
        .map((checked: boolean, i: number) => checked ? this.medicalConditions[i] : null)
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
      medicalHistory: this.fb.array(this.medicalConditions.map(() => this.fb.control(false)))
    });
  }

  getRecommendation(formData: any): string {
    const { gender, age, medicalHistory } = formData;

    if (gender !== 'female') {
      return 'Breast cancer screening recommendations are primarily targeted towards females. Please consult with your healthcare provider for personalized advice.';
    }

    const isHighRisk = medicalHistory && medicalHistory.length > 0;

    if (isHighRisk && age >= 30) {
      return 'Annual mammogram and breast MRI recommended.';
    } else if (age >= 40 && age <= 44) {
      return 'You have the option to start annual mammograms.';
    } else if (age >= 45 && age <= 54) {
      return 'Annual mammogram recommended.';
    } else if (age >= 55) {
      return 'Mammogram recommended every 1-2 years based on your preference and doctor’s advice.';
    } else {
      return 'Regular screening is not typically recommended at your age. Consult with your healthcare provider for more information.';
    }
  }
}
