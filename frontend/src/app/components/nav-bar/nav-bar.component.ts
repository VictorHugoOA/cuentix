import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { RegistroService } from 'src/app/services/registro/registro.service';
import { UsuariosService } from 'src/app/services/usuario/usuarios.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public isSeller: boolean = false;
  constructor(private registro: RegistroService, private router: Router, private users: UsuariosService) {
    const sessionId = this.registro.getSessionID()
    if(sessionId){
      this.users.isUserAVendor().subscribe((val) => {
        this.isSeller = val.seller;
      })
    }
  }

  ngOnInit(): void {
  }

  clickLogin(){
    const sessionId = this.registro.getSessionID();
    if(sessionId){
      this.router.navigate([`site/profile/${sessionId}`]);
      return;
    }
    this.router.navigate(['login']);

  }

  clickHome(){
    const userAdmin = this.users.isUserAdmin();
    if(userAdmin){
      this.router.navigate(['admin/home']);
      return;
    }
    this.router.navigate(['site/home']);
  }

  userSeller(): Observable<any>{
    const seller = this.users.isUserAVendor();
    return seller;
  }

  clickSellerAccounts(){
    const sessionId = this.registro.getSessionID();
    if(sessionId){
      this.router.navigate([`site/seller/accounts/${sessionId}`]);
      return;
    }
    this.router.navigate(['site/home']);
  }

  clickSeller(){
    const sessionId = this.registro.getSessionID();
    if(sessionId){
      this.router.navigate([`site/seller/account/${sessionId}`]);
      return;
    }
    this.router.navigate(['site/home']);
  }

  doSearch(titulo: String ){
    this.router.navigateByUrl('site/products', {
      state: {
        titulo: titulo
      }
    })
  }

  clickSignOut(){
    this.isSeller = false;
    this.registro.signOut();
  }

  isSessionUp(){
    return this.registro.getSessionID();
  }

  clickBuyedAccounts(){
    const sessionId = this.registro.getSessionID();
    if(sessionId){
      this.router.navigate([`site/buyed-accounts/${sessionId}`]);
      return;
    }

    this.router.navigate(['login']);

  }

}
