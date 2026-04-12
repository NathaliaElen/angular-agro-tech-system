import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertaService } from '../../../services/alerta.service';
import { Alerta } from '../../../models/alerta.model';

@Component({
  selector: 'app-consulta-alerta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consulta-alerta.component.html',
  styleUrls: ['../tipo-sensor/consulta-tipo-sensor.component.css'],
})
export class ConsultaAlertaComponent implements OnInit {
  alertas: Alerta[] = [];
  showPesquisaModal: boolean = false;
  tipoPesquisa: string = 'todos';
  valorPesquisa: string = '';
  message: string = '';

  constructor(
    private alertaService: AlertaService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.carregarTodos();
  }

  carregarTodos(): void {
    this.alertaService.buscarTodos().subscribe({
      next: (data) => {
        this.alertas = data;
      },
      error: (error) => {
        console.error('Erro:', error);
        this.message = 'Erro ao carregar dados.';
      },
    });
  }

  onNovo(): void {
    this.router.navigate(['/cadastro-alerta']);
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
      this.alertas = Array.isArray(data) ? data : [data];
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
        if (this.valorPesquisa)
          this.alertaService
            .buscarPorId(this.valorPesquisa)
            .subscribe({ next: handleSuccess, error: handleError });
        break;
      case 'tipoSensorId':
        if (this.valorPesquisa)
          this.alertaService
            .buscarPorTipoSensorId(this.valorPesquisa)
            .subscribe({ next: handleSuccess, error: handleError });
        break;
      case 'sensorId':
        if (this.valorPesquisa)
          this.alertaService
            .buscarPorSensorId(this.valorPesquisa)
            .subscribe({ next: handleSuccess, error: handleError });
        break;
      case 'prioridade':
        if (this.valorPesquisa)
          this.alertaService
            .buscarPorPrioridade(this.valorPesquisa)
            .subscribe({ next: handleSuccess, error: handleError });
        break;
      case 'areaId':
        if (this.valorPesquisa)
          this.alertaService
            .buscarPorAreaId(this.valorPesquisa)
            .subscribe({ next: handleSuccess, error: handleError });
        break;
    }
  }

  onFechar(): void {
    this.router.navigate(['/principal']);
  }
}
