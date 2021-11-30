import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CuentasService } from 'src/app/services/cuentas/cuentas.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public id: String;
  public account: Observable<any>;
  constructor(private route: ActivatedRoute,
              private accounts: CuentasService) {
    this.id = this.route.snapshot.paramMap.get("id") as String | "";
    this.account = this.accounts.getCuenta(this.id);
  }

  ngOnInit(): void {
  }

}
