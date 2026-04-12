import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LeituraSensor } from '../models/leitura-sensor.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LeituraSensorService {
  private apiUrl = `${environment.apiUrl}/leituras-sensores`;

  constructor(private http: HttpClient) {}

  salvar(leitura: LeituraSensor): Observable<void> {
    return this.http.post<void>(this.apiUrl, leitura);
  }

  deletar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  buscarTodos(): Observable<LeituraSensor[]> {
    return this.http.get<LeituraSensor[]>(this.apiUrl);
  }

  buscarPorId(id: string): Observable<LeituraSensor> {
    return this.http.get<LeituraSensor>(`${this.apiUrl}/${id}`);
  }

  buscarPorSensorId(sensorId: string): Observable<LeituraSensor[]> {
    return this.http.get<LeituraSensor[]>(
      `${this.apiUrl}/buscarporsensorid/${sensorId}`,
    );
  }

  buscarPorAreaId(areaId: string): Observable<LeituraSensor[]> {
    return this.http.get<LeituraSensor[]>(
      `${this.apiUrl}/buscarporareaid/${areaId}`,
    );
  }
}
