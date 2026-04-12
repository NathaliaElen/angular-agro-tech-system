import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/login-request.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData: LoginRequest = {
    email: '',
    senha: '',
  };

  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onLogin(): void {
    this.errorMessage = '';

    if (!this.loginData.email || !this.loginData.senha) {
      this.errorMessage = 'Por favor, preencha todos os campos.';
      return;
    }

    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        this.authService.saveUser(response);
        this.router.navigate(['/principal']);
      },
      error: (error) => {
        this.errorMessage =
          'Credenciais inválidas. Por favor, tente novamente.';
        console.error('Erro no login:', error);
      },
    });
  }

  onCancel(): void {
    this.loginData = {
      email: '',
      senha: '',
    };
    this.errorMessage = '';
  }

  goToNovoUsuario(): void {
    this.router.navigate(['/cadastro-usuario']);
  }
}
