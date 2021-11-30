import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistroService } from 'src/app/services/registro/registro.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private registro: RegistroService, private router: Router) { }

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

  clickBuyedAccounts(){
    const sessionId = this.registro.getSessionID();
    if(sessionId){
      this.router.navigate([`site/buyed-accounts/${sessionId}`]);
      return;
    }

    this.router.navigate(['login']);

  }

}
