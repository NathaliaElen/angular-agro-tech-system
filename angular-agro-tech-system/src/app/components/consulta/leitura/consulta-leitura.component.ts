import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LeituraSensorService } from '../../../services/leitura-sensor.service';
import { LeituraSensor } from '../../../models/leitura-sensor.model';

@Component({
  selector: 'app-consulta-leitura',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consulta-leitura.component.html',
  styleUrls: ['../tipo-sensor/consulta-tipo-sensor.component.css'],
})
export class ConsultaLeituraComponent implements OnInit {
  leituras: LeituraSensor[] = [];
  showPesquisaModal: boolean = false;
  tipoPesquisa: string = 'todos';
  valorPesquisa: string = '';
  message: string = '';

  constructor(
    private leituraService: LeituraSensorService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.carregarTodos();
  }

  carregarTodos(): void {
    this.leituraService.buscarTodos().subscribe({
      next: (data) => {
        this.leituras = data;
      },
      error: (error) => {
        console.error('Erro:', error);
        this.message = 'Erro ao carregar dados.';
      },
    });
  }

  onNovo(): void {
    this.router.navigate(['/cadastro-leitura']);
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
      this.leituras = Array.isArray(data) ? data : [data];
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
          this.leituraService
            .buscarPorId(this.valorPesquisa)
            .subscribe({ next: handleSuccess, error: handleError });
        break;
      case 'sensorId':
        if (this.valorPesquisa)
          this.leituraService
            .buscarPorSensorId(this.valorPesquisa)
            .subscribe({ next: handleSuccess, error: handleError });
        break;
      case 'areaId':
        if (this.valorPesquisa)
          this.leituraService
            .buscarPorAreaId(this.valorPesquisa)
            .subscribe({ next: handleSuccess, error: handleError });
        break;
    }
  }

  onFechar(): void {
    this.router.navigate(['/principal']);
  }
}
