import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ComprasService } from 'src/app/services/compras/compras.service';
import { CuentasService } from 'src/app/services/cuentas/cuentas.service';
import { RegistroService } from 'src/app/services/registro/registro.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public id: String;
  public account: Observable<any>;
  constructor(private route: ActivatedRoute,
              private accounts: CuentasService,
              private register: RegistroService,
              private buys: ComprasService,
              private router: Router) {
    this.id = this.route.snapshot.paramMap.get("id") as String | "";
    this.account = this.accounts.getCuenta(this.id);
  }

  buyAccount(idAccount: String){
    const sessionId = this.register.getSessionID()
    if(sessionId){
      this.buys.compraUsuario(sessionId, idAccount);
      return;
    }
    this.router.navigate(['login']);
  }

  ngOnInit(): void {
  }

}
