import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CuentasService {

  constructor(private http: HttpClient) {

  }
  public getCatalogo(titulo: String, categoria: String, plataforma: String, pagina: Number): Observable<any[]>{
    return this.http.get(`http://localhost:3000/Cuenta/VerTodos?titulo=${titulo}&tipo=${categoria}&plataforma=${plataforma}&pagina=${pagina}`)
    .pipe(map( (value: any) => value.accounts as any[]));
  }

  public getCuenta(id: String): Observable<any>{
    return this.http.get(`http://localhost:3000/Cuenta/Ver/${id}`)
    .pipe(map((value:any) => value.data[0] as any));
  }

}
