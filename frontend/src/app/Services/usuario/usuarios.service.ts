import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient) {}

  getUsuario(id: string) {
    return this.http.get(`http://localhost:3000/Usuario/Ver/${id}`).pipe(
      map((val) => {
        return val;
      })
    );
  }
}
