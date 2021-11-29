import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private buyed: ComprasService, private route: ActivatedRoute) {
    this.idUsuario = this.route.snapshot.paramMap.get('id') as String | "1";
    this.cuentasCompradas = this.buyed.getCuentasCompradasUsuario(this.idUsuario, this.pagina);
  }

  ngOnInit(): void {
  }

  onScroll(){
    this.pagina += 1;
    this.cuentasCompradas = this.buyed.getCuentasCompradasUsuario(this.idUsuario, this.pagina);
  }
  onScrollUp(){
    this.pagina -= 1;
    if(this.pagina < 1)
      this.pagina = 1;
    this.cuentasCompradas = this.buyed.getCuentasCompradasUsuario(this.idUsuario, this.pagina);
  }
}
