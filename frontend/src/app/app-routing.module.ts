import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyedAccountsComponent } from './components/buyed-accounts/buyed-accounts.component';
import { HomeComponent } from './components/home/home.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ProductComponent } from './components/product/product.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'site/home'},
  {path: 'site', component: NavBarComponent, children: [
    {path: 'home', component: HomeComponent},
    {path: 'products', component: ListProductsComponent},
    {path: 'product/:id', component: ProductComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'buyed-accounts', component: BuyedAccountsComponent}
  ]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
