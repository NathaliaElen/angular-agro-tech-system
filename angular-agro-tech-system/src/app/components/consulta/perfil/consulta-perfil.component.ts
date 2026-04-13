import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PerfilService } from '../../../services/perfil.service';
import { Perfil } from '../../../models/perfil.model';

@Component({
  selector: 'app-consulta-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consulta-perfil.component.html',
  styleUrls: ['../area/consulta-area.component.css'],
})
export class ConsultaPerfilComponent implements OnInit {
  perfis: Perfil[] = [];
  showPesquisaModal: boolean = false;
  tipoPesquisa: string = 'todos';
  valorPesquisa: string = '';
  message: string = '';

  constructor(
    private perfilService: PerfilService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.carregarTodos();
  }

  carregarTodos(): void {
    this.perfilService.buscarTodos().subscribe({
      next: (data) => {
        this.perfis = data;
      },
      error: (error) => {
        console.error('Erro ao carregar perfis:', error);
        this.message = 'Erro ao carregar dados.';
      },
    });
  }

  onNovo(): void {
    this.router.navigate(['/cadastro-perfil']);
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

    const handleError = (error: any) => {
      this.message = 'Nenhum registro encontrado.';
      console.error('Erro:', error);
    };

    switch (this.tipoPesquisa) {
      case 'todos':
        this.carregarTodos();
        this.closePesquisa();
        break;
      case 'id':
        if (this.valorPesquisa) {
          this.perfilService.buscarPorId(this.valorPesquisa).subscribe({
            next: (data) => {
              this.perfis = data ? [data] : [];
              this.closePesquisa();
            },
            error: handleError,
          });
        }
        break;
      case 'nome':
        if (this.valorPesquisa) {
          this.perfilService.buscarPorNome(this.valorPesquisa).subscribe({
            next: (data) => {
              this.perfis = data ? [data] : [];
              this.closePesquisa();
            },
            error: handleError,
          });
        }
        break;
    }
  }
}
