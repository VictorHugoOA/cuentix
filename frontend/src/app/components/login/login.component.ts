import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { RegistroService } from 'src/app/services/registro/registro.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userModel = new User('', '', '', '', '');
  constructor(private usuario: RegistroService) { }

  loginUsr(){
    console.log(this.userModel)
    this.usuario.logUsr(this.userModel);
  }

  ngOnInit(): void {
  }

}
