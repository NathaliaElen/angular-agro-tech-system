import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PerfilService } from '../../../services/perfil.service';
import { Perfil } from '../../../models/perfil.model';

@Component({
  selector: 'app-cadastro-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-perfil.component.html',
  styleUrls: ['../tipo-sensor/cadastro-tipo-sensor.component.css'],
})
export class CadastroPerfilComponent {
  perfil: Perfil = {
    nome: '',
    status: 'A',
  };

  message: string = '';
  messageType: 'success' | 'error' = 'success';

  constructor(
    private perfilService: PerfilService,
    private router: Router,
  ) {}

  onSalvar(): void {
    this.message = '';

    if (!this.validarCampos()) {
      return;
    }

    this.perfilService.salvar(this.perfil).subscribe({
      next: () => {
        this.message = 'Perfil salvo com sucesso!';
        this.messageType = 'success';
        this.onLimpar();
        setTimeout(() => (this.message = ''), 3000);
      },
      error: (error) => {
        this.message = error.error?.message || 'Erro ao salvar Perfil.';
        this.messageType = 'error';
        console.error('Erro:', error);
      },
    });
  }

  onLimpar(): void {
    this.perfil = {
      nome: '',
      status: 'A',
    };
    this.message = '';
  }

  onFechar(): void {
    this.router.navigate(['/principal']);
  }

  private validarCampos(): boolean {
    if (!this.perfil.nome) {
      this.message = 'Por favor, preencha todos os campos obrigatórios.';
      this.messageType = 'error';
      return false;
    }
    return true;
  }
}
