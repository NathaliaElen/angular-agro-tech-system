import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alerta } from '../models/alerta.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AlertaService {
  private apiUrl = `${environment.apiUrl}/alertas`;

  constructor(private http: HttpClient) {}

  salvar(alerta: Alerta): Observable<void> {
    return this.http.post<void>(this.apiUrl, alerta);
  }

  deletar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  buscarTodos(): Observable<Alerta[]> {
    return this.http.get<Alerta[]>(this.apiUrl);
  }

  buscarPorId(id: string): Observable<Alerta> {
    return this.http.get<Alerta>(`${this.apiUrl}/${id}`);
  }

  buscarPorTipoSensorId(id: string): Observable<Alerta[]> {
    return this.http.get<Alerta[]>(`${this.apiUrl}/buscarportiposensor/${id}`);
  }

  buscarPorSensorId(id: string): Observable<Alerta[]> {
    return this.http.get<Alerta[]>(`${this.apiUrl}/buscarporsensor/${id}`);
  }

  buscarPorPrioridade(prioridade: string): Observable<Alerta[]> {
    return this.http.get<Alerta[]>(
      `${this.apiUrl}/buscarporprioridade/${prioridade}`,
    );
  }

  buscarPorAreaId(id: string): Observable<Alerta[]> {
    return this.http.get<Alerta[]>(`${this.apiUrl}/buscarporarea/${id}`);
  }
}
