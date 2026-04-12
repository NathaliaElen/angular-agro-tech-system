import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LeituraSensorService } from '../../../services/leitura-sensor.service';
import { LeituraSensor } from '../../../models/leitura-sensor.model';

@Component({
  selector: 'app-cadastro-leitura',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-leitura.component.html',
  styleUrls: ['../tipo-sensor/cadastro-tipo-sensor.component.css'],
})
export class CadastroLeituraComponent {
  leitura: LeituraSensor = {
    sensorId: '',
    areaId: '',
    valor: 0,
  };

  message: string = '';
  messageType: 'success' | 'error' = 'success';

  constructor(
    private leituraService: LeituraSensorService,
    private router: Router,
  ) {}

  onSalvar(): void {
    this.message = '';

    if (!this.validarCampos()) {
      return;
    }

    this.leituraService.salvar(this.leitura).subscribe({
      next: () => {
        this.message = 'Leitura salva com sucesso!';
        this.messageType = 'success';
        this.onLimpar();
        setTimeout(() => (this.message = ''), 3000);
      },
      error: (error) => {
        this.message = error.error?.message || 'Erro ao salvar Leitura.';
        this.messageType = 'error';
        console.error('Erro:', error);
      },
    });
  }

  onLimpar(): void {
    this.leitura = {
      sensorId: '',
      areaId: '',
      valor: 0,
    };
    this.message = '';
  }

  onFechar(): void {
    this.router.navigate(['/principal']);
  }

  private validarCampos(): boolean {
    if (!this.leitura.sensorId || !this.leitura.areaId) {
      this.message = 'Por favor, preencha todos os campos obrigatórios.';
      this.messageType = 'error';
      return false;
    }
    return true;
  }
}
