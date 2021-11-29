import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { RegistroService } from 'src/app/services/registro/registro.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userModel = new User('', '', '', '','');
  constructor(private usuario: RegistroService) { }

  nuevoUsr(){
    console.log(this.userModel)
    this.usuario.newUser(this.userModel);
  }

  ngOnInit(): void {
  }

}
