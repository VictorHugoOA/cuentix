import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CuentasService } from 'src/app/services/cuentas/cuentas.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  public accountsList: Observable<any[]>;
  constructor(private accounts: CuentasService) {
    this.accountsList = this.accounts.getCatalogo();
  }

  ngOnInit(): void {
  }

}
