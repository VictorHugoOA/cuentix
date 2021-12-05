import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ComprasService } from 'src/app/services/compras/compras.service';
import { CuentasService } from 'src/app/services/cuentas/cuentas.service';
import { RegistroService } from 'src/app/services/registro/registro.service';
import { ToastrService } from 'ngx-toastr';

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
              private router: Router,
              private toastr: ToastrService) {
    this.id = this.route.snapshot.paramMap.get("id") as String | "";
    this.accountUsr = this.accounts.getCuentasVendedor(this.id);
  }

  ngOnInit(): void {
  }

  eliminarCuenta(id: any){
    console.log("presione el boton");
    this.accounts.elimCuenta(id).subscribe(data => {
      location.reload();
      this.toastr.error(
        'Cuenta eliminada con éxito!'
      );
    }, error => {
      console.log(error);
    });
    
  }

  modificar(idcuenta: any){
    this.router.navigate([`site/edit-account/${idcuenta}`]);
  }

}
