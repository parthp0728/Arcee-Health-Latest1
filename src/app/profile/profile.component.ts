import { Component, Inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatMenu } from '@angular/material/menu';
import { MatCard } from '@angular/material/card';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatListItem } from '@angular/material/list';
import { MatCardTitle } from '@angular/material/card';
import { MatCardHeader } from '@angular/material/card';
import { MatCardContent } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive, RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatIcon, MatTabsModule, MatButtonModule, MatMenu, MatMenuTrigger, MatListItem,
    MatCard,
    MatCardTitle,
    MatCardHeader,
    MatCardContent,
    MatGridListModule,
    MatListModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    RouterModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {


}
