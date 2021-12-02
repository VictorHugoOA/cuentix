import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ComprasService } from 'src/app/services/compras/compras.service';

@Component({
  selector: 'app-buyed-accounts',
  templateUrl: './buyed-accounts.component.html',
  styleUrls: ['./buyed-accounts.component.css']
})
export class BuyedAccountsComponent implements OnInit {
  public cuentasCompradas: Observable<any[]>;
  public idUsuario: String = "";
  public pagina: number = 1;
  constructor(private buyed: ComprasService, private route: ActivatedRoute,
              private router: Router) {
    this.idUsuario = this.route.snapshot.paramMap.get('id') as String | "1";
    this.cuentasCompradas = this.buyed.getCuentasCompradasUsuario(this.idUsuario, this.pagina);
  }

  ngOnInit(): void {
  }
  clickCancel(id: String){
    this.buyed.cancelarVenta(id, this.idUsuario);
  }
  clickSeeBuy(id: String){
    this.router.navigate([`site/buy-details/${id}`]);
  }
  onScroll(){
    this.pagina += 1;
    this.cuentasCompradas = this.buyed.getCuentasCompradasUsuario(this.idUsuario, this.pagina);
  }
  clickBtn(){
    this.router.navigate(['site/products']);
  }
  onScrollUp(){
    this.pagina -= 1;
    if(this.pagina < 1)
      this.pagina = 1;
    this.cuentasCompradas = this.buyed.getCuentasCompradasUsuario(this.idUsuario, this.pagina);
  }
}
