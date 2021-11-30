import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient) {}

  getUsuario(id: string): Observable<any> {
    return this.http.get(`http://localhost:3000/Usuario/Ver/${id}`);
  }
}
