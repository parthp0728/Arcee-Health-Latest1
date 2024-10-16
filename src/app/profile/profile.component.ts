import { Component } from '@angular/core';
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

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatIcon, MatTabsModule, MatButtonModule, MatMenu, MatMenuTrigger, MatListItem,
    MatCard,
    MatCardTitle,
    MatCardHeader,
    MatCardContent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  // Function to handle "See Photo" action
  seePhoto() {
    console.log('See Photo clicked');
    // You can add logic here to display the photo in full size, open a modal, etc.
  }

  // Function to handle "Upload Photo" action
  uploadPhoto() {
    console.log('Upload Photo clicked');
    // You can implement file upload functionality here
  }

  // Function to handle "Remove Photo" action
  removePhoto() {
    console.log('Remove Photo clicked');
    // You can add logic to remove the photo here
  }
}
