import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  repeatPassword: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async onSubmit() {
    if (this.password !== this.repeatPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    try {
      await this.authService.register(this.email, this.password);
      this.router.navigate(['/auth/login']);
    } catch (error) {
      this.errorMessage = 'Registration failed. Please try again.';
    }
  }
}