import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CuentasService } from 'src/app/services/cuentas/cuentas.service';
import { UsuariosService } from 'src/app/services/usuario/usuarios.service';

@Component({
  selector: 'app-cuentas-crud',
  templateUrl: './cuentas-crud.component.html',
  styleUrls: ['./cuentas-crud.component.css']
})
export class CuentasCrudComponent implements OnInit {
  public cuentaForm: FormGroup;
  public imageUrl: String | ArrayBuffer | null = "https://bulma.io/images/placeholders/480x480.png";
  public file: File | null;
  public idSeller: String | null;
  public usuario: any;

  title = "Cuenta";

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private cuentas: CuentasService,
    private route: ActivatedRoute,
    private Usuario: UsuariosService,
    private router: Router
  ) {
    this.idSeller = this.route.snapshot.paramMap.get('id') as String;
    
    const numRegex = /^[1-9]\d*(\.\d+)?$/
    
    this.cuentaForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]],
      tipo: ['', [Validators.required]],
      plataforma: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      precio: [0, [Validators.required, Validators.min(0), Validators.pattern(numRegex)]],
      imagen: ['', Validators.required]
    });

    this.file = null;
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

  addCuenta(){
    if(!this.cuentaForm.valid){
      const invalid = this.findInvalidControls();
      invalid.forEach((value) => {
        switch(value) {
          case 'imagen':
            this.toastr.error("Selecciona una imágen para la cuenta", "Error ingresando datos de la cuenta");
            break;
          case 'titulo':
            this.toastr.error("Ingresa un titulo con al menos 6 letras y menos de 255", "Error ingresando datos de la cuenta");
            break;
          case 'tipo': 
            this.toastr.error("Porfavor, selecciona una categoría para la cuenta", "Error ingresando datos de la cuenta");
            break;
          case 'plataforma':
            this.toastr.error("Ingresa una plataforma para la cuenta", "Error ingresando datos de la cuenta");
            break;
          case 'descripcion':
            this.toastr.error("Ingresa la descripcion de la cuenta", "Error ingresando datos de la cuenta");
            break;
          case 'precio':
            this.toastr.error("Porfavor, ingres un precio valido para la cuenta", "Error ingresando datos de la cuenta");
        }
      });
      return;
    }
    if(this.idSeller){
      this.cuentas.uploadFoto(this.file).subscribe((val) => {
        this.cuentas.insertarCuenta({
          titulo: this.cuentaForm.value.titulo,
          vendedor: this.idSeller,
          tipo: this.cuentaForm.value.tipo,
          plataforma: this.cuentaForm.value.plataforma,
          descripcion: this.cuentaForm.value.descripcion,
          precio: this.cuentaForm.value.precio,
          imagen: val.filename
        });
      });
      return;
    }
    this.router.navigate(['login']);
  }
}