import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Product }        from '../product';
import { ProductService } from '../product.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  @Input()
  
  product;
  products;
  productDoc;
  name;
  description;
  price;
  private selectedId: any;

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    // this.route.paramMap
    // .subscribe((params: ParamMap) => {
    //   this.selectedId = params.get('id');
    //   this.product = this.productService.getProduct(this.selectedId).valueChanges()
    // });
  }

  updateProduct(product) {
    this.productService.updateProduct(product);
  }

  deleteProduct(id) {
    this.productService.deleteProduct(id);
  }

}
