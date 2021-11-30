import { Component, OnInit } from '@angular/core';
import { User } from './../../models/user';
import { RegistroService } from 'src/app/services/registro/registro.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userModel = new User('', '', '', '','Selecciona tipo de usuario');
  public userForm: FormGroup;
  constructor(private usuario: RegistroService, private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      usuario: ['', Validators.required, Validators.minLength(6), Validators.maxLength(255)],
      email: ['', Validators.required, Validators.email],
      tipo: ['' ,Validators.required],
      
    })
  }

  nuevoUsr(){
    console.log(this.userModel)
    //this.usuario.newUser(this.userModel);
  }

  ngOnInit(): void {
  }

}
