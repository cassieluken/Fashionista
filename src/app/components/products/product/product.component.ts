import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/services/product-service/product.models';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  createdProduct: IProduct = null;
  constructor() { }

  ngOnInit(): void {
  }
  onCreatedProduct(createdProduct: IProduct) {
    this.createdProduct = createdProduct;
  }
}
