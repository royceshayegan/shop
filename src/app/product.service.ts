import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Product } from './product';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap'

@Injectable()
export class ProductService {

  productsCollection: AngularFirestoreCollection<Product>;
  productDoc: AngularFirestoreDocument<Product>; 
  products: Observable<Product[]>;

  constructor(public afs: AngularFirestore) {
    this.productsCollection = this.afs.collection('products');
    this.products = this.productsCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Product;
        data.id = a.payload.doc.id;
        return data;
      });
    });
   }

  getProducts() {
    return this.products;
  }

  addProduct(product: Product) {
    this.productsCollection.add(product);
  }

  updateProduct(product: Product) {
    this.productDoc = this.afs.doc(`products/${product.id}`);
    this.productDoc.update(product);
  }

  deleteProduct(product: Product) {
    this.productDoc = this.afs.doc(`products/${product.id}`);
    this.productDoc.delete();
  }

}
