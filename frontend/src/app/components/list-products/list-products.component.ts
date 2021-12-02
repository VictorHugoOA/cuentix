import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CuentasService } from 'src/app/services/cuentas/cuentas.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  public plataformaForm: FormControl = new FormControl('');
  public accountsList: Observable<any[]>;
  public plataforma: String = "";
  public titulo: String = "";
  public categoria: String = "";
  public pagina: number = 1;
  constructor(private accounts: CuentasService, private route: Router) {
    let state = {...this.route.getCurrentNavigation()?.extras.state};
    if("plataforma" in state)
      this.plataforma = state.plataforma;
    if("titulo" in state)
      this.titulo = state.titulo;
    if("categoria" in state)
      this.categoria = state.categoria;
    this.accountsList = this.accounts.getCatalogo(this.titulo, this.categoria, this.plataforma, this.pagina);
    this.plataformaForm.setValue(this.plataforma);
  }
  setCategoria(categoria: String){
    this.categoria = categoria;
    this.accountsList = this.accounts.getCatalogo(this.titulo, this.categoria, this.plataforma, this.pagina);
  }
  setPlataforma(){
    this.plataforma = this.plataformaForm.value;
    this.accountsList = this.accounts.getCatalogo(this.titulo, this.categoria, this.plataforma, this.pagina);
  }
  ngOnInit(): void {
  }

  onScroll(){
    this.pagina = this.pagina + 1;
    this.accounts.getCatalogo(this.titulo, this.categoria, this.plataforma, this.pagina);
  }

  goToProductPage(id: String){
    this.route.navigate([`site/product/${id}`])
  }

  onScrollUp(){
    this.pagina = this.pagina - 1;
    if(this.pagina < 1){
      this.pagina = 1;
    }
    this.accounts.getCatalogo(this.titulo, this.categoria, this.plataforma, this.pagina);
  }

}
