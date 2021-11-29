import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  constructor(private http: HttpClient) { }
  public getCuentasCompradasUsuario(idUsuario: String, pagina: Number): Observable<any[]>{
    return this.http.get(`http://localhost:3000/Compras/Ver/${idUsuario}?pagina=${pagina}`)
    .pipe(map( (value: any) => value.accounts as any[]));
  }
}
