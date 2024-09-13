import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppThemeService {
  private isDarkTheme = false;
  private isBrowser: boolean;

  constructor() {
    // Check if the code is running in the browser
    this.isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';

    if (this.isBrowser) {
      // Retrieve the saved theme from localStorage only if in a browser environment
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        this.isDarkTheme = savedTheme === 'dark';
        this.applyTheme();
      }
    }
  }

  toggleTheme(): void {
    if (this.isBrowser) {
      this.isDarkTheme = !this.isDarkTheme;
      this.applyTheme();

      // Save the theme to localStorage only if in a browser environment
      localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
    }
  }

  private applyTheme(): void {
    if (this.isDarkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  get currentTheme(): string {
    return this.isDarkTheme ? 'dark' : 'light';
  }
}
