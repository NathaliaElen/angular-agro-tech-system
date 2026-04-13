import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SensorService } from '../../../services/sensor.service';
import { AreaService } from '../../../services/area.service';
import { TipoSensorService } from '../../../services/tipo-sensor.service';
import { Sensor } from '../../../models/sensor.model';

@Component({
  selector: 'app-consulta-sensor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consulta-sensor.component.html',
  styleUrls: ['../tipo-sensor/consulta-tipo-sensor.component.css'],
})
export class ConsultaSensorComponent implements OnInit {
  sensores: Sensor[] = [];
  areaMap: Map<string, string> = new Map();
  tipoSensorMap: Map<string, string> = new Map();
  showPesquisaModal: boolean = false;
  tipoPesquisa: string = 'todos';
  valorPesquisa: string = '';
  message: string = '';

  constructor(
    private sensorService: SensorService,
    private areaService: AreaService,
    private tipoSensorService: TipoSensorService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.areaService.buscarTodos().subscribe({
      next: (dados) => dados.forEach((a) => this.areaMap.set(a.id!, a.nome)),
      error: (err) => console.error('Erro ao carregar áreas:', err),
    });
    this.tipoSensorService.buscarTodos().subscribe({
      next: (dados) => dados.forEach((ts) => this.tipoSensorMap.set(ts.id!, ts.nome)),
      error: (err) => console.error('Erro ao carregar tipos de sensor:', err),
    });
    this.carregarTodos();
  }

  carregarTodos(): void {
    this.sensorService.buscarTodos().subscribe({
      next: (data) => {
        this.sensores = data;
      },
      error: (error) => {
        console.error('Erro:', error);
        this.message = 'Erro ao carregar dados.';
      },
    });
  }

  onNovo(): void {
    this.router.navigate(['/cadastro-sensor']);
  }

  onPesquisar(): void {
    this.showPesquisaModal = true;
  }

  closePesquisa(): void {
    this.showPesquisaModal = false;
    this.tipoPesquisa = 'todos';
    this.valorPesquisa = '';
  }

  confirmarPesquisa(): void {
    this.message = '';

    const handleSuccess = (data: any) => {
      this.sensores = Array.isArray(data) ? data : [data];
      this.closePesquisa();
    };

    const handleError = (error: any) => {
      this.message = 'Nenhum registro encontrado.';
      console.error('Erro:', error);
    };

    switch (this.tipoPesquisa) {
      case 'todos':
        this.carregarTodos();
        break;
      case 'id':
        if (this.valorPesquisa) {
          this.sensorService
            .buscarPorId(this.valorPesquisa)
            .subscribe({ next: handleSuccess, error: handleError });
        }
        break;
      case 'codigo':
        if (this.valorPesquisa) {
          this.sensorService
            .buscarPorCodigo(this.valorPesquisa)
            .subscribe({ next: handleSuccess, error: handleError });
        }
        break;
      case 'areaId':
        if (this.valorPesquisa) {
          this.sensorService
            .buscarPorAreaId(this.valorPesquisa)
            .subscribe({ next: handleSuccess, error: handleError });
        }
        break;
      case 'status':
        if (this.valorPesquisa) {
          this.sensorService
            .buscarPorStatus(this.valorPesquisa)
            .subscribe({ next: handleSuccess, error: handleError });
        }
        break;
    }
  }

  onFechar(): void {
    this.router.navigate(['/principal']);
  }
}
