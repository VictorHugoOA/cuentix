import { ActivatedRoute, Router } from '@angular/router';
import { ThisReceiver, ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuariosService } from 'src/app/Services/usuario/usuarios.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public user: Observable<any>;
  public id: string;

  constructor(Usuario: UsuariosService, route: ActivatedRoute) {
    this.id = route.snapshot.params.id;
    this.user = Usuario.getUsuario(this.id);
    console.log(this.user);
  }

  ngOnInit(): void {}
}
