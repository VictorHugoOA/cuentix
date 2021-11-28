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
  public getCatalogo(): Observable<any[]>{
    return this.http.get('http://localhost:3000/Cuenta/VerTodos').pipe(map( (value: any) => value.accounts as any[]));
  }
}
