import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HomeComponent, CommonModule, RouterOutlet, MatToolbarModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  constructor(private router: Router) {}
  goToHome() {
    localStorage.setItem(
      'accessToken',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjIxYTc3Y2RhNGY0MzNlYTA3ZTcxZCIsInVzZXJJZCI6IjYzNjIxYTc3Y2RhNGY0MzNlYTA3ZTcxZCIsImVtYWlsIjoiYWRtaW5AYmV0dGVyZ29sZi5jb20iLCJ0eXBlIjoiYWRtaW4iLCJpYXQiOjE3MjA3ODAwMzIsImV4cCI6MTcyMzM3MjAzMn0.2hnKw02cTsHkf6TOOXMHCN1iEMQlQ7qMZQ2JxLdvuDM'
    );
    this.router.navigateByUrl('/home');
  }
}