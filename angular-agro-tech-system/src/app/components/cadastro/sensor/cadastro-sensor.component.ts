import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SensorService } from '../../../services/sensor.service';
import { Sensor } from '../../../models/sensor.model';

@Component({
  selector: 'app-cadastro-sensor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-sensor.component.html',
  styleUrls: ['./cadastro-sensor.component.css'],
})
export class CadastroSensorComponent {
  sensor: Sensor = {
    areaId: '',
    tipoSensorId: '',
    codigo: '',
    intervaloSegundos: 60,
    status: 'A',
  };

  message: string = '';
  messageType: 'success' | 'error' = 'success';

  constructor(
    private sensorService: SensorService,
    private router: Router,
  ) {}

  onSalvar(): void {
    this.message = '';

    if (!this.validarCampos()) {
      return;
    }

    this.sensorService.salvar(this.sensor).subscribe({
      next: () => {
        this.message = 'Sensor salvo com sucesso!';
        this.messageType = 'success';
        this.onLimpar();
        setTimeout(() => (this.message = ''), 3000);
      },
      error: (error) => {
        this.message = error.error?.message || 'Erro ao salvar Sensor.';
        this.messageType = 'error';
        console.error('Erro:', error);
      },
    });
  }

  onLimpar(): void {
    this.sensor = {
      areaId: '',
      tipoSensorId: '',
      codigo: '',
      intervaloSegundos: 60,
      status: 'A',
    };
    this.message = '';
  }

  onFechar(): void {
    this.router.navigate(['/principal']);
  }

  private validarCampos(): boolean {
    if (
      !this.sensor.areaId ||
      !this.sensor.tipoSensorId ||
      !this.sensor.codigo
    ) {
      this.message = 'Por favor, preencha todos os campos obrigatórios.';
      this.messageType = 'error';
      return false;
    }
    return true;
  }
}
