import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AreaService } from '../../../services/area.service';
import { Area } from '../../../models/area.model';

@Component({
  selector: 'app-consulta-area',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consulta-area.component.html',
  styleUrls: ['./consulta-area.component.css'],
})
export class ConsultaAreaComponent implements OnInit {
  areas: Area[] = [];
  showPesquisaModal: boolean = false;
  tipoPesquisa: string = 'todos';
  valorPesquisa: string = '';
  message: string = '';

  constructor(
    private areaService: AreaService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.carregarTodos();
  }

  carregarTodos(): void {
    this.areaService.buscarTodos().subscribe({
      next: (data) => {
        this.areas = data;
      },
      error: (error) => {
        console.error('Erro ao carregar áreas:', error);
        this.message = 'Erro ao carregar dados.';
      },
    });
  }

  onNovo(): void {
    this.router.navigate(['/cadastro-area']);
  }

  onPesquisar(): void {
    this.showPesquisaModal = true;
  }

  onFechar(): void {
    this.router.navigate(['/principal']);
  }

  closePesquisa(): void {
    this.showPesquisaModal = false;
    this.tipoPesquisa = 'todos';
    this.valorPesquisa = '';
  }

  confirmarPesquisa(): void {
    this.message = '';

    if (this.tipoPesquisa === 'todos') {
      this.carregarTodos();
      this.closePesquisa();
    } else if (this.tipoPesquisa === 'id') {
      if (!this.valorPesquisa) {
        this.message = 'Por favor, informe o ID.';
        return;
      }
      this.areaService.buscarPorId(this.valorPesquisa).subscribe({
        next: (data) => {
          this.areas = data ? [data] : [];
          this.closePesquisa();
        },
        error: (error) => {
          console.error('Erro ao buscar área:', error);
          this.message = 'Erro ao buscar área.';
        },
      });
    }
  }
}
