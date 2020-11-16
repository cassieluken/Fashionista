import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProduct } from 'src/app/services/product-service/product.models';
import { ProductService } from 'src/app/services/product-service/product.service';
import { ShoppingService } from 'src/app/services/shopping-service/shopping.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  msg: string;
  wantedProduct: IProduct = null;
  products: Array<IProduct> = []; 
  productForm: FormGroup;
  constructor(protected productService:ProductService, private formBuilder: FormBuilder, private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(){
    this.productService.getAllProducts().toPromise().then((res: Array<IProduct>)=>{
      console.log(res);
      this.products = res;  //helps ngOnChanges
    });
  }
  showModal(product){
    this.wantedProduct = product;
    console.log(this.wantedProduct);
    this.productForm = this.formBuilder.group({
      name: this.formBuilder.control(product.name, [Validators.required]),
      image: this.formBuilder.control(product.image, [Validators.required]),
      price: this.formBuilder.control(product.price, [Validators.required]),
      quantity: this.formBuilder.control(product.quantity, [Validators.required]),
      _id: this.wantedProduct._id
    })
  }
  addToCart(){
    const values = this.productForm.value;
    console.log("FOR CART");
    console.log(this.wantedProduct);
    this.shoppingService.addToCart(values).subscribe((result:any)=>{
      console.log(result);
      let msg = `${result.quantity} ${result.name} was added to your Cart!`;
    })
  }
  addToWishlist(){
    const values = this.productForm.value;
    console.log("FOR CART");
    console.log(this.wantedProduct);
    this.shoppingService.addToWishlist(values).subscribe((result:any)=>{
      console.log(result);
      let msg = `${result.quantity} ${result.name} was added to your Cart!`;
    })
  }
  
}
