import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoSensor } from '../models/tipo-sensor.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TipoSensorService {
  private apiUrl = `${environment.apiUrl}/tipos-sensores`;

  constructor(private http: HttpClient) {}

  salvar(tipoSensor: TipoSensor): Observable<void> {
    return this.http.post<void>(this.apiUrl, tipoSensor);
  }

  deletar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  buscarTodos(): Observable<TipoSensor[]> {
    return this.http.get<TipoSensor[]>(`${this.apiUrl}/buscartodos`);
  }

  buscarPorId(id: string): Observable<TipoSensor> {
    return this.http.get<TipoSensor>(`${this.apiUrl}/buscarporid/${id}`);
  }

  buscarPorNome(nome: string): Observable<TipoSensor> {
    return this.http.get<TipoSensor>(`${this.apiUrl}/buscarpornome/${nome}`);
  }

  buscarPorStatus(status: string): Observable<TipoSensor[]> {
    return this.http.get<TipoSensor[]>(
      `${this.apiUrl}/buscarporstatus/${status}`,
    );
  }
}
