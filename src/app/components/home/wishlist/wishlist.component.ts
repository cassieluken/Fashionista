import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/services/product-service/product.models';
import { ShoppingService } from 'src/app/services/shopping-service/shopping.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  products: Array<IProduct> = [];
  product: IProduct = null;
  successMsg: String = '';
  constructor(protected shoppingService : ShoppingService) { }

  ngOnInit(): void {
    this.loadAll();
  }
  // Load all products.
  private loadAll() {
    console.log('in loadAll');
    this.shoppingService.getWishlist().toPromise().then((res: Array<IProduct>)=>{
      console.log(res);
      this.products = res;  //helps ngOnChanges
    });

  }
  // Delete a product. 
  delete(id: string) {
    this.shoppingService.deleteProduct(id).toPromise().then((result: any) => this.loadAll());
  }
  move(id:string, product){
    this.product = product;
    // console.log("WISHLIST MOVE FUNC");
    // console.log(id);
    // console.log(this.product); BOTH SHOW UP HERE PROBLEM NOT HERE
    this.shoppingService.moveToCart(id,this.product).toPromise().then((result: any)=> this.loadAll());
    //this.shoppingService.deleteWishlist(id);
    this.successMsg = 'You have successfully added to your cart, you may now delete this item from your wishlist if you want.';
  }
}
