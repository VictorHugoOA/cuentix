import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UsuariosService } from 'src/app/services/usuario/usuarios.service';

@Component({
  selector: 'app-modprofile',
  templateUrl: './modprofile.component.html',
  styleUrls: ['./modprofile.component.css'],
})
export class ModprofileComponent implements OnInit {
  public id: String;
  public profileForm: FormGroup;
  public usuario: Observable<any>;

  constructor(
    private toastr: ToastrService,
    private Usuario: UsuariosService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.id = this.route.snapshot.paramMap.get('id') as String;
    this.usuario = this.Usuario.getUsuario(this.id);
    this.profileForm = this.formBuilder.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(25),
        ],
      ],
      contra: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],

      Descripcion: ['', [Validators.required]],
    });

    this.usuario.subscribe((val) => {
      this.profileForm.patchValue({
        nombre: val.Usuario,
        contra: val.Contrasena,
        email: val.Email,
        Descripcion: val.Descripcion,
      });
    });
  }

  ngOnInit(): void {}
  volver() {
    this.router.navigate([`site/profile/${this.id}`]);
  }
  guardar() {
    if (this.profileForm.valid) {
      const userModel = new User(
        this.profileForm.get('nombre')?.value,
        this.profileForm.get('email')?.value,
        this.profileForm.get('contra')?.value,
        '',
        this.profileForm.get('Descripcion')?.value,
        ''
      );

      this.Usuario.modUsuario(this.id, userModel);
    }

    const invalid: String[] = this.findInvalidControls();
    invalid.forEach((value) => {
      switch (value) {
        case 'usuario':
          this.toastr.error(
            'El usuario debe tener entre 6 y 25 caractéres',
            'Error registrando usuario'
          );
          break;
        case 'contra':
          this.toastr.error(
            'Debes ingresar una contraseña',
            'Error registrando usuario'
          );
          break;
        case 'email':
          this.toastr.error(
            'Debes ingresar un Correo electrónico válido',
            'Error registrando usuario'
          );
          break;
        case 'Descripcion':
          this.toastr.error(
            'Ingresa una descripción',
            'Error registrando usuario'
          );
          break;
      }
    });
  }

  findInvalidControls(): String[] {
    const invalid = [];
    const controls = this.profileForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }
}
