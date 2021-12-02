import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}

  getUsuario(id: String): Observable<any> {
    return this.http
      .get(`http://localhost:3000/Usuario/Ver/${id}`)
      .pipe(map((val: any) => val.user as any));
  }

  modUsuario(id: String, usuario: User): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .put(`http://localhost:3000/Usuario/Modificar/${id}`, {
          usuario: usuario.usuario,
          email: usuario.email,
          contra: usuario.password,
          desc: usuario.descripcion,
        })
        .subscribe(
          (response) => {
            resolve(response);
            this.router.navigate([`site/profile/${id}`]);
          },
          (error) => {
            this.toastr.error(error.error.error, 'Error registrando usuario');
          }
        );
    });
  }
}
