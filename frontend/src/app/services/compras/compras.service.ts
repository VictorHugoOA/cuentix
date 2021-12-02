import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  constructor(private http: HttpClient, private router: Router) { }
  public getCuentasCompradasUsuario(idUsuario: String, pagina: Number): Observable<any[]>{
    return this.http.get(`http://localhost:3000/Compras/Ver/${idUsuario}?pagina=${pagina}`)
    .pipe(map( (value: any) => value.ped as any[]));
  }

  public getCuentasTotales(): Observable<any[]>{
    return this.http.get(`http://localhost:3000/Compras/VerCompraTodos`)
    .pipe(map( (value: any) => value.ped as any[]));
  }
  public getCompra(id: String): Observable<any>{
    return this.http.get(`http://localhost:3000/Compras/VerPed/${id}`)
    .pipe(map((value:any) => value.ped[0] as any));
  }

  public compraUsuario(idUser: String, idAccount: String): Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.put(`http://localhost:3000/Compras/Insertar/${idUser}`, {
        fecha: new Date(),
        cuenta: idAccount
      }).subscribe((response) => {
        resolve(response);
        this.router.navigate([`site/buyed-accounts/${idUser}`]);
      })
    })
  }

  public setEstadoPedido(id: String, estado: String): Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.put(`http://localhost:3000/Compras/Modificar/${id}`,{estado: estado})
      .subscribe((response) => {
        resolve(response);
        this.router.navigate(['admin/status-accounts']);
      })
    })
  }
}
