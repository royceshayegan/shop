import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { CoreModule } from './core/core.module';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AppRoutingModule } from './app-routing.module';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserFormComponent } from './user-form/user-form.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { HomeComponent } from './home/home.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductListComponent } from './product-list/product-list.component';

import { ProductService } from './product.service';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    UserLoginComponent,
    UserFormComponent,
    ProductCardComponent,
    HomeComponent,
    CreateProductComponent,
    ProductListComponent,
    ProductEditComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    CoreModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
