import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cuenta } from 'src/app/models/Cuenta/cuenta';

@Injectable({
  providedIn: 'root'
})
export class CuentasService {

  constructor(private http: HttpClient, private router: Router) {
  }
  
  public getCatalogo(titulo: String, categoria: String, plataforma: String, pagina: Number): Observable<any[]>{
    return this.http.get(`http://localhost:3000/Cuenta/VerTodos?titulo=${titulo}&tipo=${categoria}&plataforma=${plataforma}&pagina=${pagina}`)
    .pipe(map( (value: any) => value.accounts as any[]));
  }

  public getCuentasVendedor(id: String){
    return this.http.get(`http://localhost:3000/Cuenta/CuentasVendedor/${id}`)
    .pipe(map((value: any) => value.accounts as any[]));
  }

  public getCuenta(id: String): Observable<any>{
    return this.http.get(`http://localhost:3000/Cuenta/Ver/${id}`)
    .pipe(map((value:any) => value.data[0] as any));
  }

  public uploadFoto(file: File | null): Observable<any> {
    if(file){
      let formData = new FormData();
      formData.append('photo', file);
      return this.http.post('http://localhost:3000/Cuenta/SubirImagen', formData);
    }
    return new Observable();
  }

  public insertarCuenta(cuenta: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/Cuenta/Insertar', cuenta).subscribe((response) => {
        resolve(response);
        this.router.navigate(['site/home']);
      })
    })
  }

  public elimCuenta(id: String): Observable<any>{
    return this.http.get(`http://localhost:3000/Cuenta/Eliminar/${id}`);
  }

  public editAccount(id: String, cuenta: Cuenta): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(`http://localhost:3000/Cuenta/Modificar/${id}`, {
          titu: cuenta.titulo,
          vendedor: cuenta.vendedor,
          tipo: cuenta.tipo,
          plataforma: cuenta.plataforma,
          desc: cuenta.descripcion,
          pre: cuenta.precio,
          imag: cuenta.imagen
        })
        .subscribe(
          (response) => {
            resolve(response);
            this.router.navigate([`seller/account/${id}`]);
          },
          (error) => {
            console.log(error);
          }
        );
    });
  }

}
