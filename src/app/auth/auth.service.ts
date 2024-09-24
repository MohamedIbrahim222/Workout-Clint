import { Injectable } from '@angular/core';
import { api } from '../Api';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5079/api/Auth';

  constructor(private router: Router) {}

  async register(email: string, password: string): Promise<any> {
    return api.post(`${this.baseUrl}/register`, { email, password });
  }

  async login(email: string, password: string): Promise<void> {
    const response = await api.post(`${this.baseUrl}/login`, { email, password });
    const token = response.data.token;
    this.setToken(token);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
