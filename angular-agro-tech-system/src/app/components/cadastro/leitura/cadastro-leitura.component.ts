import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LeituraSensorService } from '../../../services/leitura-sensor.service';
import { SensorService } from '../../../services/sensor.service';
import { AreaService } from '../../../services/area.service';
import { LeituraSensor } from '../../../models/leitura-sensor.model';
import { Sensor } from '../../../models/sensor.model';
import { Area } from '../../../models/area.model';

@Component({
  selector: 'app-cadastro-leitura',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-leitura.component.html',
  styleUrls: ['../tipo-sensor/cadastro-tipo-sensor.component.css'],
})
export class CadastroLeituraComponent implements OnInit {
  leitura: LeituraSensor = {
    sensorId: '',
    areaId: '',
    valor: 0,
  };

  sensores: Sensor[] = [];
  areas: Area[] = [];

  message: string = '';
  messageType: 'success' | 'error' = 'success';

  constructor(
    private leituraService: LeituraSensorService,
    private sensorService: SensorService,
    private areaService: AreaService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.sensorService.buscarTodos().subscribe({
      next: (dados) => (this.sensores = dados),
      error: (err) => console.error('Erro ao carregar sensores:', err),
    });

    this.areaService.buscarTodos().subscribe({
      next: (dados) => (this.areas = dados),
      error: (err) => console.error('Erro ao carregar áreas:', err),
    });
  }

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
