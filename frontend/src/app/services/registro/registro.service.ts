import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './../../models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  url = 'http://localhost:3000/register/Registro';

  constructor(private http: HttpClient, private router: Router,
              private toastr: ToastrService) {

  }

  public newUser(body: User) :Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/Usuario/Registro', {
        usuario: body.usuario,
        email: body.email,
        contra: body.password,
        tipo: body.type
      }).subscribe((response) => {
        resolve(response);
        this.router.navigate(['site/home']);
      },
      (error) => {
        this.toastr.error(error.error.error, "Error registrando usuario")
      });
    })
  }

  public getSessionID(){
    return sessionStorage.getItem('user');
  }

  public logUsr(body: User): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/Usuario/login', {
        usuario: body.usuario,
        contra: body.password,
      })
      .subscribe((response: any) => {
        sessionStorage.setItem('user', response.id);
        resolve(response);
        this.router.navigate(['site/home']);
      }, (error) => {
        console.log(error);
        this.toastr.error("Credencianes no válidas de sesión. Porfavor, intente de nuevo", "Error iniciar sesión");
      })
    })
  }
}
