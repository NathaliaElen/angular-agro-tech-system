import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-cadastro-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['../tipo-sensor/cadastro-tipo-sensor.component.css'],
})
export class CadastroUsuarioComponent {
  usuario: Usuario = {
    nome: '',
    email: '',
    senhaHash: '',
    status: 'ATIVO',
  };

  message: string = '';
  messageType: 'success' | 'error' = 'success';

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
  ) {}

  onSalvar(): void {
    this.message = '';

    if (!this.validarCampos()) {
      return;
    }

    this.usuarioService.cadastrar(this.usuario).subscribe({
      next: () => {
        this.message = 'Usuário cadastrado com sucesso!';
        this.messageType = 'success';
        this.onLimpar();
        setTimeout(() => {
          this.message = '';
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        this.message = error.error?.message || 'Erro ao cadastrar Usuário.';
        this.messageType = 'error';
        console.error('Erro:', error);
      },
    });
  }

  onLimpar(): void {
    this.usuario = {
      nome: '',
      email: '',
      senhaHash: '',
      status: 'ATIVO',
    };
    this.message = '';
  }

  onFechar(): void {
    this.router.navigate(['/login']);
  }

  private validarCampos(): boolean {
    if (!this.usuario.nome || !this.usuario.email || !this.usuario.senhaHash) {
      this.message = 'Por favor, preencha todos os campos obrigatórios.';
      this.messageType = 'error';
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.usuario.email)) {
      this.message = 'Por favor, informe um e-mail válido.';
      this.messageType = 'error';
      return false;
    }

    return true;
  }
}
