import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sensor } from '../models/sensor.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SensorService {
  private apiUrl = `${environment.apiUrl}/sensores`;

  constructor(private http: HttpClient) {}

  salvar(sensor: Sensor): Observable<void> {
    return this.http.post<void>(this.apiUrl, sensor);
  }

  deletar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  buscarTodos(): Observable<Sensor[]> {
    return this.http.get<Sensor[]>(this.apiUrl);
  }

  buscarPorId(id: string): Observable<Sensor> {
    return this.http.get<Sensor>(`${this.apiUrl}/buscarporid/${id}`);
  }

  buscarPorCodigo(codigo: string): Observable<Sensor> {
    return this.http.get<Sensor>(`${this.apiUrl}/buscarporcodigo/${codigo}`);
  }

  buscarPorAreaId(areaId: string): Observable<Sensor[]> {
    return this.http.get<Sensor[]>(`${this.apiUrl}/buscarporareaid/${areaId}`);
  }

  buscarPorStatus(status: string): Observable<Sensor[]> {
    return this.http.get<Sensor[]>(`${this.apiUrl}/buscarporstatus/${status}`);
  }
}
