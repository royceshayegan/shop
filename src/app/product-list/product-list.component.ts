import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Product }        from '../product';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Input()p

  products: Product[];
  product: Product = {
    name: '',
    description: '',
    price: ''
  }

  editState: boolean = false;
  productToEdit: Product;
  loading: boolean = true;



  private selectedId: any;

  constructor(private router: Router, private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.loading = false;
    });
  }

  onSubmit(f) {
    this.productService.addProduct(this.product);
    f.resetForm();
  }

  editProduct(event, product: Product) {
    this.editState = true;
    this.productToEdit = product;
  }

  clearState() {
    this.editState = false;
    this.productToEdit = null;
  }

  updateProduct(product: Product) {
    this.productService.updateProduct(product);
    this.clearState();
  }

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product); 
    this.clearState();
  }

}
