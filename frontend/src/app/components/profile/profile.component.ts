import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/Services/usuario/usuarios.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(Usuario: UsuariosService) {}

  ngOnInit(): void {}
}
