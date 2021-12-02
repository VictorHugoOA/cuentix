import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ComprasService } from 'src/app/services/compras/compras.service';

@Component({
  selector: 'app-buy-account-details',
  templateUrl: './buy-account-details.component.html',
  styleUrls: ['./buy-account-details.component.css']
})
export class BuyAccountDetailsComponent implements OnInit {

  public id: String;
  public buyAccount: Observable<any>;

  constructor(private router: ActivatedRoute, private buys: ComprasService) {
    this.id = this.router.snapshot.paramMap.get('id') as String;
    console.log(this.id);
    this.buyAccount = this.buys.getCompra(this.id);
  }

  ngOnInit(): void {
  }

}
