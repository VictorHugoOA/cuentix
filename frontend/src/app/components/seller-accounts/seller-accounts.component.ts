import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ComprasService } from 'src/app/services/compras/compras.service';
import { CuentasService } from 'src/app/services/cuentas/cuentas.service';
import { RegistroService } from 'src/app/services/registro/registro.service';

@Component({
  selector: 'app-seller-accounts',
  templateUrl: './seller-accounts.component.html',
  styleUrls: ['./seller-accounts.component.css']
})
export class SellerAccountsComponent implements OnInit {

  public id: String;
  public accountUsr: Observable<any>;
  constructor(private route: ActivatedRoute,
              private accounts: CuentasService,
              private register: RegistroService,
              private buys: ComprasService,
              private router: Router) {
    this.id = this.route.snapshot.paramMap.get("id") as String | "";
    this.accountUsr = this.accounts.getCuentasVendedor(this.id);
  }

  ngOnInit(): void {
  }

}
