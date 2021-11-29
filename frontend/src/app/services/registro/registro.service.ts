import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  url = 'http://localhost:3000/register/Registro';

  constructor(private http: HttpClient) {

  }
  
  public newUser(body :User): Observable<any>{
    return this.http.post('http://localhost:3000/register/Registro', body);
  }

  public logUsr(body :User): Observable<any>{
    return this.http.post('http://localhost:3000/register/login', body);
  }
}
