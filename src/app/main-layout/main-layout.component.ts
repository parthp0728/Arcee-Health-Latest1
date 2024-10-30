import { Component, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { MatList } from '@angular/material/list';
import { MatListItem } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatSidenavContent } from '@angular/material/sidenav';
import { MatSidenav } from '@angular/material/sidenav';
import { MatNavList } from '@angular/material/list';
import { CommonModule } from '@angular/common';

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
    MatSidenavContent,
    MatSidenav,
    MatNavList,
    RouterModule,
    CommonModule
  ]
})
export class MainLayoutComponent {
  translations: any = {}; // Store the translations
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isSidebarOpened: boolean = true;

  constructor(private router: Router) {}

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  toggleSidebar() {
    this.sidenav.toggle();
    this.isSidebarOpened = !this.isSidebarOpened;
    setTimeout(() => this.sidenav.toggle(), 0);
  }
}
