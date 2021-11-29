import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ProductComponent } from './components/product/product.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BuyedAccountsComponent } from './components/buyed-accounts/buyed-accounts.component';
import { BuyAccountDetailsComponent } from './components/buy-account-details/buy-account-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ListProductsComponent,
    NavBarComponent,
    ProductComponent,
    ProfileComponent,
    BuyedAccountsComponent,
    BuyAccountDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
