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

  selfConditionOptions = [
    { key: "1", name: "Crohns disease or ulcerative colitis" },
    { key: "2", name: "Familial Adenomatous polyposis (FAP)" },
    { key: "3", name: "Hereditary nonpolyposis colorectal cancer" },
    { key: "4", name: "None of the above" },
  ];

  familyConditionOptions = [
    { key: "1", name: "First degree relative below 60 years been detected with colorectal cancer" },
    { key: "2", name: "First degree relative above 60 years been detected with colorectal cancer" },
    { key: "3", name: "Two or more first degree relatives been detected with colorectal cancer" },
    { key: "4", name: "Two or more second degree relatives been detected with colorectal cancer" },
    { key: "5", name: 'None of the above' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.colonCancerForm = this.fb.group({
      gender: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      selfCondition: ['', Validators.required],
      familyCondition: []
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
