import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { AddressService } from '../services/address.service';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../language.service';  // Import LanguageService

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    RouterModule
  ]
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  addressOptions: Observable<string[]> | null = null;
  currentLanguage: string = 'en';  // Default language

  getSecurityQuestions(): string[] {
    const securityQuestions: { en: string[], es: string[] } = {
      en: [
        'What was the name of your first pet?',
        'What is the name of the street you grew up on?',
        'What was the name of your elementary school?'
      ],
      es: [
        '¿Cuál era el nombre de tu primera mascota?',
        '¿Cuál es el nombre de la calle donde creciste?',
        '¿Cuál fue el nombre de tu escuela primaria?'
      ]
    };
  
    return securityQuestions[this.currentLanguage as 'en' | 'es'];  // Explicitly define the keys as 'en' or 'es'
  }  

  constructor(private fb: FormBuilder, private addressService: AddressService, private languageService: LanguageService) {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      address: ['', [Validators.required]],
      securityQuestion1: ['', [Validators.required]],
      securityAnswer1: ['', [Validators.required]],
      securityQuestion2: ['', [Validators.required]],
      securityAnswer2: ['', [Validators.required]],
      securityQuestion3: ['', [Validators.required]],
      securityAnswer3: ['', [Validators.required]]
    });
  }  

  ngOnInit(): void {
    // Set up the address autocomplete
    this.addressOptions = this.registrationForm.get('address')!.valueChanges.pipe(
      startWith(''),
      switchMap(value => this._filterAddress(value))
    );

    // Subscribe to language changes
    this.languageService.currentLanguage$.subscribe((language: string) => {
      this.currentLanguage = language;
    });
  }

  private _filterAddress(value: string): Observable<string[]> {
    if (value.length > 2) {
      return this.addressService.searchAddress(value);
    } else {
      return new Observable<string[]>(observer => observer.next([]));
    }
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      console.log('Registration Form Submitted', this.registrationForm.value);
      // Implement registration logic here
    }
  }
}
