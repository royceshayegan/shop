import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'product-detail/:id', component: ProductDetailComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes) 
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
