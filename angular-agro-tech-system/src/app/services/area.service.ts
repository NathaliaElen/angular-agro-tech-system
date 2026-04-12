import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Area } from '../models/area.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AreaService {
  private apiUrl = `${environment.apiUrl}/areas`;

  constructor(private http: HttpClient) {}

  salvar(area: Area): Observable<void> {
    return this.http.post<void>(this.apiUrl, area);
  }

  deletar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  buscarTodos(): Observable<Area[]> {
    return this.http.get<Area[]>(this.apiUrl);
  }

  buscarPorId(id: string): Observable<Area> {
    return this.http.get<Area>(`${this.apiUrl}/${id}`);
  }
}
