import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ComprasService } from 'src/app/services/compras/compras.service';
import { UsuariosService } from 'src/app/services/usuario/usuarios.service';

@Component({
  selector: 'app-status-admin',
  templateUrl: './status-admin.component.html',
  styleUrls: ['./status-admin.component.css']
})
export class StatusAdminComponent implements OnInit {public plataformaForm: FormControl = new FormControl('');
public accountsList: Observable<any[]>;
public plataforma: String = "";
public titulo: String = "";
public categoria: String = "";
public pagina: number = 1;
constructor(private accounts: ComprasService, private route: Router, private users: UsuariosService) {
  if(!this.users.isUserAdmin()){
    this.route.navigate(['site/home']);
  }
  let state = {...this.route.getCurrentNavigation()?.extras.state};
  if("plataforma" in state)
    this.plataforma = state.plataforma;
  if("titulo" in state)
    this.titulo = state.titulo;
  if("categoria" in state)
    this.categoria = state.categoria;
  this.accountsList = this.accounts.getCuentasTotales();
}

changeStatus(evento: any, id: String){
  console.log(id);
  console.log(evento.target.value);
  this.accounts.setEstadoPedido(id, evento.target.value);
}

setCategoria(categoria: String){
  this.categoria = categoria;
  //this.accountsList = this.accounts.getCatalogo(this.titulo, this.categoria, this.plataforma, this.pagina);
}
setPlataforma(){
  this.plataforma = this.plataformaForm.value;
 // this.accountsList = this.accounts.getCatalogo(this.titulo, this.categoria, this.plataforma, this.pagina);
}
ngOnInit(): void {
}

onScroll(){
  this.pagina = this.pagina + 1;
  //this.accounts.getCatalogo(this.titulo, this.categoria, this.plataforma, this.pagina);
}

onScrollUp(){
  this.pagina = this.pagina - 1;
  if(this.pagina < 1){
    this.pagina = 1;
  }
  //this.accounts.getCatalogo(this.titulo, this.categoria, this.plataforma, this.pagina);
}
}
