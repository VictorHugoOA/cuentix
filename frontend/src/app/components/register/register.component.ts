import { Component, OnInit } from '@angular/core';
import { User } from './../../models/user';
import { RegistroService } from 'src/app/services/registro/registro.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public tipoUsuarios: any = ["Comprador", "Vendedor"];
  public userForm: FormGroup;
  constructor(private usuario: RegistroService, private formBuilder: FormBuilder,
              private toastr: ToastrService) {
    this.userForm = this.formBuilder.group({
      usuario: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email]],
      tipo: ['', Validators.required],
      contra: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
      contraCon: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]]
    })
  }

  nuevoUsr(){
    if(this.userForm.valid){
      const contra = this.userForm.get('contra')?.value;
      const contraCon = this.userForm.get('contraCon')?.value;
      if(contra === contraCon){
        const userModel = new User(this.userForm.get('usuario')?.value,
                                   this.userForm.get('email')?.value,
                                   contra,
                                   contraCon,
                                   this.userForm.get('tipo')?.value);
        this.usuario.newUser(userModel);
        return;
      }
      this.toastr.error("Las contraseñas no coinciden", "Error registrando usuario")
    }
    const invalid: String [] = this.findInvalidControls();
    invalid.forEach((value) => {
      switch(value){
        case "usuario":
          this.toastr.error("El usuario debe tener entre 6 y 25 caractéres", "Error registrando usuario");
        break;
        case "email":
          this.toastr.error("Debes ingresar un Correo electrónico válido", "Error registrando usuario");
        break;
        case "tipo":
          this.toastr.error("Porfavor, selecciona que tipo de usuario vas a ser", "Error registrando usuario");
        break;
        case "contra":
          this.toastr.error("La contraseña debe tener mínimo 8 caractéres", "Error registrando usuario");
        break;
        case "contraCon":
          this.toastr.error("Por favor, confirma tu contraseña. Mínimo 8 caractéres", "Error registrando usuario");
        break;
      }
    });
  }
  findInvalidControls(): String[]{
    const invalid = [];
    const controls = this.userForm.controls;
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
