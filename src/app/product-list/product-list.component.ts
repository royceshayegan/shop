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
  @Input()
  product;
  products;
  name;
  description;
  price;

  private selectedId: any;

  constructor(private router: Router, private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.products = this.productService.getSnapshot();
    // this.route.paramMap
    // .subscribe((params: ParamMap) => {
    //   this.selectedId = params.get('id');
    //   this.products = this.productService.getSnapshot();
    // });
  }

  createProduct() {
    this.productService.createProduct(this.name, this. description, this.price);
  }

  updateProduct(product) {
    this.productService.updateProduct(product);
  }

  deleteProduct(id) {
    this.productService.deleteProduct(id);
  }

}
