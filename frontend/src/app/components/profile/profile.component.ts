import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from 'src/app/Services/usuario/usuarios.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public id: String;
  public usuario: Observable<any>;
  constructor(private Usuario: UsuariosService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id') as String;
    this.usuario = this.Usuario.getUsuario(this.id);
  }

  ngOnInit(): void {}
}
