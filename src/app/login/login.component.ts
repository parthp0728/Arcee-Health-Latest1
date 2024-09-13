import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckbox } from '@angular/material/checkbox';
import { Router, RouterModule } from '@angular/router';  // Import Router
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatCheckbox,
    RouterModule,
    CommonModule,
    FormsModule
  ]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;
  currentLanguage: string = 'en';

  constructor(private fb: FormBuilder, private router: Router, private languageService: LanguageService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]], // Ensures password is valid with a minimum length
    });
  }

  ngOnInit(): void {
    console.log('LoginComponent Initialized');

    // Subscribe to the language changes from LanguageService
    this.languageService.currentLanguage$.subscribe((language: string) => {
      this.currentLanguage = language;
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Form Submitted', this.loginForm.value);
      // Implement login logic here
    }
  }

  goToRegister(): void {
    this.router.navigate(['/register']);  // Navigate to the registration page
  }

  onLanguageChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.currentLanguage = selectElement.value;
  }
}
