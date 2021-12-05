import { Observable } from 'rxjs';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CuentasService } from 'src/app/services/cuentas/cuentas.service';
import { UsuariosService } from 'src/app/services/usuario/usuarios.service';
import { Cuenta } from 'src/app/models/Cuenta/cuenta';


@Component({
  selector: 'app-editar-cuenta',
  templateUrl: './editar-cuenta.component.html',
  styleUrls: ['./editar-cuenta.component.css']
})
export class EditarCuentaComponent implements OnInit {
  public cuentaForm: FormGroup;
  public imageUrl: String | ArrayBuffer | null = "https://bulma.io/images/placeholders/480x480.png";
  public file: File | null | undefined;
  public id: String;
  public cuentas: Observable<any>;

  title = "Editar cuenta";

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private Cuentas: CuentasService,
    private route: ActivatedRoute,
    private UsuarioSer: UsuariosService,
    private router: Router
  ) {
    this.id = this.route.snapshot.paramMap.get('id') as String;
    console.log("id " + this.id);

    this.cuentas = this.Cuentas.getCuenta(this.id);
    console.log(this.cuentas);
    
    const numRegex = /^[1-9]\d*(\.\d+)?$/
    
    this.cuentaForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]],
      tipo: ['', [Validators.required]],
      plataforma: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      precio: [0, [Validators.required, Validators.min(0), Validators.pattern(numRegex)]],
      imagen: ['', Validators.required]
    });

    this.cuentas.subscribe((val) =>{
      this.cuentaForm.patchValue({
          titulo: val.titulo,
          vendedor: val.vendedor,
          tipo: val.tipo,
          plataforma: val.plataforma,
          descripcion: val.descripcion,
          precio: val.precio,
          imagen: val.imagen
      });
    });
  }

  onChange(files: FileList | null){
    if(files){
      this.file = files[0];
      this.cuentaForm.patchValue({
        imagen: this.file.name
      })
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = event => {
        this.imageUrl = reader.result;
      }
    }
  }

  ngOnInit(): void {
  }

  volver(){

  }

  findInvalidControls(): String[] {
    const invalid = [];
    const controls = this.cuentaForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

  editCuenta(){
    if(this.cuentaForm.valid){
      const cuentaModel = new Cuenta(
        this.cuentaForm.get('titulo')?.value,
        this.cuentaForm.get('vendedor')?.value,
        this.cuentaForm.get('tipo')?.value,
        this.cuentaForm.get('plataforma')?.value,
        this.cuentaForm.get('descripcion')?.value,
        this.cuentaForm.get('precio')?.value,
        this.cuentaForm.get('imagen')?.value
      );
      this.Cuentas.editAccount(this.id, cuentaModel);
    }
  }
}