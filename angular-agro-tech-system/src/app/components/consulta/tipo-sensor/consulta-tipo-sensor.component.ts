import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TipoSensorService } from '../../../services/tipo-sensor.service';
import { TipoSensor } from '../../../models/tipo-sensor.model';

@Component({
  selector: 'app-consulta-tipo-sensor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consulta-tipo-sensor.component.html',
  styleUrls: ['./consulta-tipo-sensor.component.css'],
})
export class ConsultaTipoSensorComponent implements OnInit {
  tiposSensores: TipoSensor[] = [];
  showPesquisaModal: boolean = false;
  tipoPesquisa: string = 'todos';
  valorPesquisa: string = '';
  message: string = '';

  constructor(
    private tipoSensorService: TipoSensorService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.carregarTodos();
  }

  carregarTodos(): void {
    this.tipoSensorService.buscarTodos().subscribe({
      next: (data) => {
        this.tiposSensores = data;
      },
      error: (error) => {
        console.error('Erro ao carregar tipos de sensores:', error);
        this.message = 'Erro ao carregar dados.';
      },
    });
  }

  onNovo(): void {
    this.router.navigate(['/cadastro-tipo-sensor']);
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

    switch (this.tipoPesquisa) {
      case 'todos':
        this.carregarTodos();
        break;
      case 'id':
        if (this.valorPesquisa) {
          this.tipoSensorService.buscarPorId(this.valorPesquisa).subscribe({
            next: (data) => {
              this.tiposSensores = [data];
              this.closePesquisa();
            },
            error: (error) => {
              this.message = 'Nenhum registro encontrado.';
              console.error('Erro:', error);
            },
          });
        }
        break;
      case 'nome':
        if (this.valorPesquisa) {
          this.tipoSensorService.buscarPorNome(this.valorPesquisa).subscribe({
            next: (data) => {
              this.tiposSensores = [data];
              this.closePesquisa();
            },
            error: (error) => {
              this.message = 'Nenhum registro encontrado.';
              console.error('Erro:', error);
            },
          });
        }
        break;
      case 'status':
        if (this.valorPesquisa) {
          this.tipoSensorService.buscarPorStatus(this.valorPesquisa).subscribe({
            next: (data) => {
              this.tiposSensores = data;
              this.closePesquisa();
            },
            error: (error) => {
              this.message = 'Nenhum registro encontrado.';
              console.error('Erro:', error);
            },
          });
        }
        break;
    }
  }

  onFechar(): void {
    this.router.navigate(['/principal']);
  }
}
