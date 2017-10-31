import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Product } from './product';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap'

@Injectable()
export class ProductService {

  selectedProduct: Product;
  productsCollection: AngularFirestoreCollection<Product>;
  productDoc: AngularFirestoreDocument<Product>; 

  constructor(private afs: AngularFirestore) {

    this.productsCollection = afs.collection<Product>('products');

   }

  getData(): Observable<Product[]> {
    return this.productsCollection.valueChanges();
  }



  getSnapshot() {
    // ['added', 'modified', 'removed']
    return this.productsCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        return { id: a.payload.doc.id, ...a.payload.doc.data() }
      })
    })
  }
  
  getProduct(id) {
    return this.afs.doc<Product>('products/' + id);
  }

  getProductData(selectedId) {
    return this.afs.doc<Product>('products/' + selectedId).valueChanges();
  }

  createProduct(name, description, price) {
    const product: Product = { name, description, price };
    return this.productsCollection.add(product);
  }

  updateProduct(product: Product) {
    return this.getProduct(product.id).update(product)
  }

  deleteProduct(id) {
    return this.getProduct(id).delete()
  }

  getAll() {
    return this.afs.doc<Product>('products');
  }

}
