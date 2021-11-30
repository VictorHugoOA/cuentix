import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  url = 'http://localhost:3000/register/Registro';

  constructor(private http: HttpClient, private router: Router) {

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
      });
    })
  }

  public logUsr(body: User): Observable<any> {
    return this.http.post('http://localhost:3000/Usuario/login', body);
  }
}
