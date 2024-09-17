import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<string>('en'); // Default language is 'en'
  currentLanguage$ = this.currentLanguageSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Method to change the language
  changeLanguage(lang: string): void {
    this.currentLanguageSubject.next(lang);
  }

  // Load the translations dynamically
  loadTranslations(lang: string) {
    return this.http.get(`/assets/i18n/${lang}.json`);
  }
}
