import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private languageSubject = new BehaviorSubject<string>('en');  // Default language is English
  currentLanguage$ = this.languageSubject.asObservable();  // Observable for language changes

  switchLanguage(language: string) {
    this.languageSubject.next(language);  // Change the language
  }

  get currentLanguage(): string {
    return this.languageSubject.value;
  }
}
