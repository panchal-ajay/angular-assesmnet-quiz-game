import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  displayName: string = '';

  constructor(private router: Router) {
    const storedName = localStorage.getItem('displayName');
    if (storedName) {
      this.displayName = storedName;
    }
  }

  startGame() {
    if (this.displayName.trim()) {
      localStorage.setItem('displayName', this.displayName);
      this.router.navigate(['/game']);
    } else {
      alert('Please enter a display name.');
    }
  }
}
