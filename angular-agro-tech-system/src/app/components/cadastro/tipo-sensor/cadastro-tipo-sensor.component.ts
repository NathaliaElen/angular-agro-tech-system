import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TipoSensorService } from '../../../services/tipo-sensor.service';
import { TipoSensor } from '../../../models/tipo-sensor.model';

@Component({
  selector: 'app-cadastro-tipo-sensor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-tipo-sensor.component.html',
  styleUrls: ['./cadastro-tipo-sensor.component.css'],
})
export class CadastroTipoSensorComponent {
  tipoSensor: TipoSensor = {
    nome: '',
    unidadeMedida: '',
    descricao: '',
    status: 'A',
  };

  message: string = '';
  messageType: 'success' | 'error' = 'success';

  constructor(
    private tipoSensorService: TipoSensorService,
    private router: Router,
  ) {}

  onSalvar(): void {
    this.message = '';

    if (!this.validarCampos()) {
      return;
    }

    this.tipoSensorService.salvar(this.tipoSensor).subscribe({
      next: () => {
        this.message = 'Tipo de Sensor salvo com sucesso!';
        this.messageType = 'success';
        this.onLimpar();
        setTimeout(() => (this.message = ''), 3000);
      },
      error: (error) => {
        this.message = error.error?.message || 'Erro ao salvar Tipo de Sensor.';
        this.messageType = 'error';
        console.error('Erro:', error);
      },
    });
  }

  onLimpar(): void {
    this.tipoSensor = {
      nome: '',
      unidadeMedida: '',
      descricao: '',
      status: 'A',
    };
    this.message = '';
  }

  onFechar(): void {
    this.router.navigate(['/principal']);
  }

  private validarCampos(): boolean {
    if (!this.tipoSensor.nome || !this.tipoSensor.unidadeMedida) {
      this.message = 'Por favor, preencha todos os campos obrigatórios.';
      this.messageType = 'error';
      return false;
    }
    return true;
  }
}
