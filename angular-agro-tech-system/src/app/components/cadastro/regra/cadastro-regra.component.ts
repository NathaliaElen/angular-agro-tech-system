import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegraService } from '../../../services/regra.service';
import { TipoSensorService } from '../../../services/tipo-sensor.service';
import { SensorService } from '../../../services/sensor.service';
import { AreaService } from '../../../services/area.service';
import { Regra } from '../../../models/regra.model';
import { TipoSensor } from '../../../models/tipo-sensor.model';
import { Sensor } from '../../../models/sensor.model';
import { Area } from '../../../models/area.model';

@Component({
  selector: 'app-cadastro-regra',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-regra.component.html',
  styleUrls: ['../tipo-sensor/cadastro-tipo-sensor.component.css'],
})
export class CadastroRegraComponent implements OnInit {
  regra: Regra = {
    nome: '',
    descricao: '',
    tipoSensorId: '',
    limiteMin: 0,
    limiteMax: 0,
    prioridade: 'B',
    areaId: '',
    sensorId: '',
    status: 'A',
  };

  tiposSensores: TipoSensor[] = [];
  sensores: Sensor[] = [];
  areas: Area[] = [];

  message: string = '';
  messageType: 'success' | 'error' = 'success';

  constructor(
    private regraService: RegraService,
    private tipoSensorService: TipoSensorService,
    private sensorService: SensorService,
    private areaService: AreaService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.tipoSensorService.buscarTodos().subscribe({
      next: (dados) => (this.tiposSensores = dados),
      error: (err) => console.error('Erro ao carregar tipos de sensor:', err),
    });

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

    this.regraService.salvar(this.regra).subscribe({
      next: () => {
        this.message = 'Regra salva com sucesso!';
        this.messageType = 'success';        
        this.onLimpar();
        setTimeout(() => (this.message = ''), 3000);
      },
      error: (error) => {
        this.message = error.error?.message || 'Erro ao salvar Regra.';
        this.messageType = 'error';
        console.error('Erro:', error);
      },
    });
  }

  onLimpar(): void {
    this.regra = {
      nome: '',
      descricao: '',
      tipoSensorId: '',
      limiteMin: 0,
      limiteMax: 0,
      prioridade: 'B',
      areaId: '',
      sensorId: '',
      status: 'A',
    };
    this.message = '';
  }

  onFechar(): void {
    this.router.navigate(['/principal']);
  }

  private validarCampos(): boolean {
    if (!this.regra.nome || !this.regra.tipoSensorId) {
      this.message = 'Por favor, preencha todos os campos obrigatórios.';
      this.messageType = 'error';
      return false;
    }
    return true;
  }
}
