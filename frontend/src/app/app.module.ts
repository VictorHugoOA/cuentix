import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatusAdminComponent } from './components/status-admin/status-admin.component';

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
    BuyAccountDetailsComponent,
    StatusAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InfiniteScrollModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
