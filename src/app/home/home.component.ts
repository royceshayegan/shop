import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { ProductService } from '../product.service';


export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
}



@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  selectedProduct: Product;
  
  @Input()
  product: Observable<Product>;
  

  productsCollection: AngularFirestoreCollection<Product>;
  productDoc: AngularFirestoreDocument<Product>;
  products: Observable<Product[]>;
  
  

  constructor(private afs: AngularFirestore) { 
    this.productsCollection = afs.collection<Product>('products');
    this.products = this.productsCollection.valueChanges();
    // this.productDoc = afs.doc<Product>(`products/${product.id}`);
    // this.product = this.productDoc.valueChanges();
  }

  ngOnInit() {
  }

  addProduct(name, description, price) {
    const id = this.afs.createId();
    const product: Product = { id, name, description, price };
    this.afs.doc(`products/${id}`).set(product);
  }

  saveProduct(product) {
    this.productDoc = this.afs.doc<Product>(`products/${product.id}`);
    this.productDoc.update(product);
 }

 deleteProduct(id) {
  this.productDoc = this.afs.doc<Product>(`products/` + id);
  this.productDoc.delete();
 }

  onSelect(product: Product): void {
    this.selectedProduct = product;
    console.log([product]);
  }

}
