import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../language.service';  // Import Language Service

@Component({
  selector: 'app-care-for-older-adults',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule
  ],
  templateUrl: './care-for-older-adults.component.html',
  styleUrls: ['./care-for-older-adults.component.scss']
})
export class CareForOlderAdultsComponent implements OnInit {
  oldAgeForm!: FormGroup;
  displayRecommendation = false;
  title = 'Your Personalized Recommendation';
  showOldAge = false;
  currentLanguage: string = 'en';  // Default to English

  constructor(private fb: FormBuilder, private languageService: LanguageService) {}

  ngOnInit(): void {
    this.oldAgeForm = this.fb.group({
      gender: ['', Validators.required],
      age: [50, [Validators.required, Validators.min(50), Validators.max(100)]],
    });

    // Subscribe to language changes
    this.languageService.currentLanguage$.subscribe(language => {
      this.currentLanguage = language;
    });
  }

  onSubmit(): void {
    if (this.oldAgeForm.valid) {
      const formData = this.oldAgeForm.value;
      console.log('Form Submitted', formData);

      // Simple decision logic for displaying recommendations
      this.showOldAge = formData.age >= 66;
      this.displayRecommendation = true;
    }
  }

  resetForm(): void {
    this.oldAgeForm.reset({
      gender: '',
      age: 50
    });
    this.displayRecommendation = false;
    this.showOldAge = false;
  }
}
