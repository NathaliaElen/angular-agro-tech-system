import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-consulta-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consulta-usuario.component.html',
  styleUrls: ['../tipo-sensor/consulta-tipo-sensor.component.css'],
})
export class ConsultaUsuarioComponent implements OnInit {
  usuarios: Usuario[] = [];
  showPesquisaModal: boolean = false;
  tipoPesquisa: string = 'todos';
  valorPesquisa: string = '';
  message: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.carregarTodos();
  }

  carregarTodos(): void {
    this.usuarioService.listarTodos().subscribe({
      next: (data) => {
        this.usuarios = data;
      },
      error: (error) => {
        console.error('Erro:', error);
        this.message = 'Erro ao carregar dados.';
      },
    });
  }

  onNovo(): void {
    this.router.navigate(['/cadastro-usuario']);
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
      this.usuarios = Array.isArray(data) ? data : [data];
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
          this.usuarioService
            .buscarPorId(this.valorPesquisa)
            .subscribe({ next: handleSuccess, error: handleError });
        break;
      case 'nome':
        if (this.valorPesquisa)
          this.usuarioService
            .buscarPorNome(this.valorPesquisa)
            .subscribe({ next: handleSuccess, error: handleError });
        break;
      case 'email':
        if (this.valorPesquisa)
          this.usuarioService
            .buscarPorEmail(this.valorPesquisa)
            .subscribe({ next: handleSuccess, error: handleError });
        break;
    }
  }

  onFechar(): void {
    this.router.navigate(['/principal']);
  }
}
