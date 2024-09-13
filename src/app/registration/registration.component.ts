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

  addressOptions: Observable<string[]> | null = null; // Initialize as null

  securityQuestions = [
    'What was the name of your first pet?',
    'What is the name of the street you grew up on?',
    'What was the name of your elementary school?',
    'What is your mother’s maiden name?',
    'What was the make and model of your first car?',
    'What is the name of your favorite childhood friend?',
    'What was the first concert you attended?',
    'What is your father’s middle name?'
  ];

  constructor(private fb: FormBuilder, private addressService: AddressService) {
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
  }

  private _filterAddress(value: string): Observable<string[]> {
    if (value.length > 2) { // Start searching when the user has entered at least 3 characters
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
