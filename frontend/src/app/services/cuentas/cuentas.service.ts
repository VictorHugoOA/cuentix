import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

}
