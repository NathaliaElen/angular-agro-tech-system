import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertaService } from '../../../services/alerta.service';
import { Alerta } from '../../../models/alerta.model';

@Component({
  selector: 'app-cadastro-alerta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-alerta.component.html',
  styleUrls: ['../tipo-sensor/cadastro-tipo-sensor.component.css'],
})
export class CadastroAlertaComponent {
  alerta: Alerta = {
    regraId: '',
    leituraSensorId: '',
    prioridade: 'BAIXA',
    titulo: '',
    mensagem: '',
  };

  message: string = '';
  messageType: 'success' | 'error' = 'success';

  constructor(
    private alertaService: AlertaService,
    private router: Router,
  ) {}

  onSalvar(): void {
    this.message = '';

    if (!this.validarCampos()) {
      return;
    }

    this.alertaService.salvar(this.alerta).subscribe({
      next: () => {
        this.message = 'Alerta salvo com sucesso!';
        this.messageType = 'success';
        this.onLimpar();
        setTimeout(() => (this.message = ''), 3000);
      },
      error: (error) => {
        this.message = error.error?.message || 'Erro ao salvar Alerta.';
        this.messageType = 'error';
        console.error('Erro:', error);
      },
    });
  }

  onLimpar(): void {
    this.alerta = {
      regraId: '',
      leituraSensorId: '',
      prioridade: 'BAIXA',
      titulo: '',
      mensagem: '',
    };
    this.message = '';
  }

  onFechar(): void {
    this.router.navigate(['/principal']);
  }

  private validarCampos(): boolean {
    if (
      !this.alerta.regraId ||
      !this.alerta.leituraSensorId ||
      !this.alerta.titulo
    ) {
      this.message = 'Por favor, preencha todos os campos obrigatórios.';
      this.messageType = 'error';
      return false;
    }
    return true;
  }
}
