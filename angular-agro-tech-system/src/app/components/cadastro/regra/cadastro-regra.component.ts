import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegraService } from '../../../services/regra.service';
import { Regra } from '../../../models/regra.model';

@Component({
  selector: 'app-cadastro-regra',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-regra.component.html',
  styleUrls: ['../tipo-sensor/cadastro-tipo-sensor.component.css'],
})
export class CadastroRegraComponent {
  regra: Regra = {
    nome: '',
    descricao: '',
    tipoSensorId: '',
    limiteMin: 0,
    limiteMax: 0,
    prioridade: 'BAIXA',
    areaId: '',
    sensorId: '',
    status: 'A',
  };

  message: string = '';
  messageType: 'success' | 'error' = 'success';

  constructor(
    private regraService: RegraService,
    private router: Router,
  ) {}

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
      prioridade: 'BAIXA',
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
