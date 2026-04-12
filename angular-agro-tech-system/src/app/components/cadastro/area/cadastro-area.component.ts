import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AreaService } from '../../../services/area.service';
import { Area } from '../../../models/area.model';

@Component({
  selector: 'app-cadastro-area',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-area.component.html',
  styleUrls: ['../tipo-sensor/cadastro-tipo-sensor.component.css'],
})
export class CadastroAreaComponent {
  area: Area = {
    nome: '',
    codigo: '',
    latitude: undefined,
    longitude: undefined,
    status: 'A',
  };

  message: string = '';
  messageType: 'success' | 'error' = 'success';

  constructor(
    private areaService: AreaService,
    private router: Router,
  ) {}

  onSalvar(): void {
    this.message = '';

    if (!this.validarCampos()) {
      return;
    }

    this.areaService.salvar(this.area).subscribe({
      next: () => {
        this.message = 'Área salva com sucesso!';
        this.messageType = 'success';
        this.onLimpar();
        setTimeout(() => (this.message = ''), 3000);
      },
      error: (error) => {
        this.message = error.error?.message || 'Erro ao salvar Área.';
        this.messageType = 'error';
        console.error('Erro:', error);
      },
    });
  }

  onLimpar(): void {
    this.area = {
      nome: '',
      codigo: '',
      latitude: undefined,
      longitude: undefined,
      status: 'A',
    };
    this.message = '';
  }

  onFechar(): void {
    this.router.navigate(['/principal']);
  }

  private validarCampos(): boolean {
    if (!this.area.nome || !this.area.codigo) {
      this.message = 'Por favor, preencha todos os campos obrigatórios.';
      this.messageType = 'error';
      return false;
    }
    return true;
  }
}
