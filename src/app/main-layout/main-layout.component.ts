import { Component, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { MatList } from '@angular/material/list';
import { MatListItem } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavContent } from '@angular/material/sidenav';
import { MatSidenav } from '@angular/material/sidenav';
import { MatNavList } from '@angular/material/list';
import { MatDivider } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MatFormField } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/select';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatMenu } from '@angular/material/menu';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  standalone: true,
  imports: [
    MatSidenavContainer,
    MatToolbar,
    MatList,
    MatListItem,
    MatIcon,
    MatInputModule,
    MatSidenavContent,
    MatSidenav,
    MatNavList,
    FormsModule,
    RouterModule,
    CommonModule,
    MatDivider,
    MatFormField,
    MatSelect,
    MatOption,
    MatMenuTrigger,
    MatMenu
  ]
})
export class MainLayoutComponent {
  translations: any = {}; // Store the translations
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isSidebarOpened: boolean = true;
  selectedLanguage: string = 'en';
  languages = [
      { code: 'en', label: 'English' },
      { code: 'es', label: 'Spanish' }
   ];
   currentLanguage: string = 'en'; // Default language

  constructor(private router: Router, public languageService: LanguageService) {}

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  toggleSidebar() {
    this.sidenav.toggle();
    this.isSidebarOpened = !this.isSidebarOpened;
    setTimeout(() => this.sidenav.toggle(), 0);
  }

  onLanguageChange(event: any): void {
    const languageCode = event.target.value;
    this.languageService.changeLanguage(languageCode); // Update language via service
    this.currentLanguage = languageCode; // Reflect the change in the dropdown
  }

 navigateTo(path: string) {
    this.router.navigate([path]);
 }
}
