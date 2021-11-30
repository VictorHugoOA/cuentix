import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { RegistroService } from 'src/app/services/registro/registro.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  constructor(private usuario: RegistroService, private fb: FormBuilder,
              private toastr: ToastrService) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      contra: ['', Validators.required]
    });
  }

  loginUsr(){
    if(this.loginForm.valid){
      const userModel = new User(this.loginForm.get('usuario')?.value, '',
                                  this.loginForm.get('contra')?.value, '', '');
      this.usuario.logUsr(userModel);
      return;
    }
    const invalid: String[] = this.findInvalidControls();
    invalid.forEach((value) => {
      switch(value){
        case "usuario":
          this.toastr.error("Debe ingresar un usuario", "Error iniciar sesión");
          break;
        case "contra":
          this.toastr.error("Deeb ingresar una contraseña", "Error iniciar sesión");
      }
    })
    this.loginForm.setValue({contra: ''});
  }

  findInvalidControls(): String[]{
    const invalid = [];
    const controls = this.loginForm.controls;
    for(const name in controls){
      if(controls[name].invalid){
        invalid.push(name);
      }
    }
    return invalid;
  }

  ngOnInit(): void {
  }

}
