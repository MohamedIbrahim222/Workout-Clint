import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="text-center">
        <h1 class="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p class="text-2xl text-gray-600 mb-8">Oops! Page not found.</p>
        <a [routerLink]="isLoggedIn ? '/dashboard' : '/auth/login'" 
           class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          {{ isLoggedIn ? 'Go to Dashboard' : 'Go to Login' }}
        </a>
      </div>
    </div>
  `,
  styles: []
})
export class NotFoundComponent {
  constructor(private authService: AuthService) {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}