import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegraService } from '../../../services/regra.service';
import { Regra } from '../../../models/regra.model';

@Component({
  selector: 'app-consulta-regra',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consulta-regra.component.html',
  styleUrls: ['../tipo-sensor/consulta-tipo-sensor.component.css'],
})
export class ConsultaRegraComponent implements OnInit {
  regras: Regra[] = [];
  showPesquisaModal: boolean = false;
  tipoPesquisa: string = 'todos';
  valorPesquisa: string = '';
  message: string = '';

  constructor(
    private regraService: RegraService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.carregarTodos();
  }

  carregarTodos(): void {
    this.regraService.buscarTodos().subscribe({
      next: (data) => {
        this.regras = data;
      },
      error: (error) => {
        console.error('Erro:', error);
        this.message = 'Erro ao carregar dados.';
      },
    });
  }

  onNovo(): void {
    this.router.navigate(['/cadastro-regra']);
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
      this.regras = Array.isArray(data) ? data : [data];
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
          this.regraService
            .buscarPorId(this.valorPesquisa)
            .subscribe({ next: handleSuccess, error: handleError });
        }
        break;
      case 'tipoSensorId':
        if (this.valorPesquisa) {
          this.regraService
            .buscarPorTipoSensorId(this.valorPesquisa)
            .subscribe({ next: handleSuccess, error: handleError });
        }
        break;
      case 'sensorId':
        if (this.valorPesquisa) {
          this.regraService
            .buscarPorSensorId(this.valorPesquisa)
            .subscribe({ next: handleSuccess, error: handleError });
        }
        break;
      case 'prioridade':
        if (this.valorPesquisa) {
          this.regraService
            .buscarPorPrioridade(this.valorPesquisa)
            .subscribe({ next: handleSuccess, error: handleError });
        }
        break;
      case 'areaId':
        if (this.valorPesquisa) {
          this.regraService
            .buscarPorAreaId(this.valorPesquisa)
            .subscribe({ next: handleSuccess, error: handleError });
        }
        break;
    }
  }

  onFechar(): void {
    this.router.navigate(['/principal']);
  }
}
