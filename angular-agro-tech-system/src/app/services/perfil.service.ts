import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Perfil } from '../models/perfil.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PerfilService {
  private apiUrl = `${environment.apiUrl}/perfis`;

  constructor(private http: HttpClient) {}

  salvar(perfil: Perfil): Observable<void> {
    return this.http.post<void>(this.apiUrl, perfil);
  }

  deletar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  buscarTodos(): Observable<Perfil[]> {
    return this.http.get<Perfil[]>(this.apiUrl);
  }

  buscarPorId(id: string): Observable<Perfil> {
    return this.http.get<Perfil>(`${this.apiUrl}/id/${id}`);
  }

  buscarPorNome(nome: string): Observable<Perfil> {
    return this.http.get<Perfil>(`${this.apiUrl}/nome/${nome}`);
  }
}
