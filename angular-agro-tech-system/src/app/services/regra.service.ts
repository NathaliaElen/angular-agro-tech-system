import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Regra } from '../models/regra.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegraService {
  private apiUrl = `${environment.apiUrl}/regras`;

  constructor(private http: HttpClient) {}

  salvar(regra: Regra): Observable<void> {
    return this.http.post<void>(this.apiUrl, regra);
  }

  deletar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  buscarTodos(): Observable<Regra[]> {
    return this.http.get<Regra[]>(this.apiUrl);
  }

  buscarPorId(id: string): Observable<Regra> {
    return this.http.get<Regra>(`${this.apiUrl}/${id}`);
  }

  buscarPorTipoSensorId(id: string): Observable<Regra[]> {
    return this.http.get<Regra[]>(`${this.apiUrl}/buscarportiposensor/${id}`);
  }

  buscarPorSensorId(id: string): Observable<Regra[]> {
    return this.http.get<Regra[]>(`${this.apiUrl}/buscarporsensor/${id}`);
  }

  buscarPorPrioridade(prioridade: string): Observable<Regra[]> {
    return this.http.get<Regra[]>(
      `${this.apiUrl}/buscarporprioridade/${prioridade}`,
    );
  }

  buscarPorAreaId(id: string): Observable<Regra[]> {
    return this.http.get<Regra[]>(`${this.apiUrl}/buscarporarea/${id}`);
  }
}
