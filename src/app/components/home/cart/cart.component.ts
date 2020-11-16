import { prepareEventListenerParameters } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProduct } from 'src/app/services/product-service/product.models';
import { ShoppingService } from 'src/app/services/shopping-service/shopping.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products: Array<IProduct> = [];
  product: IProduct; 
  payTotal: number;
  purchaseForm: FormGroup;
  constructor(protected shoppingService: ShoppingService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loadAll();
  }
  private loadAll() {
    console.log('in loadAll');
    this.shoppingService.getCart().toPromise().then((res: Array<IProduct>)=>{ 
      console.log(res); 
      this.products = res;  //helps ngOnChanges
    });

  }
  //implement quantity change dropdown, move back to cart instead of
  delete(id: string) {
    this.shoppingService.deleteProductCart(id).toPromise().then((result: any) => this.loadAll());
  }

  makePurchase(products){
    console.log("IN MAKE PURCHASE");
    console.log(products);
 
    // const arr = [1,2,3]; 
    // let total = 0;
    // for (const i in arr){
    //   total+= arr[i];
    //   console.log(arr[i]);
    //   console.log(total);
    // }
    // console.log(total); //6 RIGHT

    // const obj = [{'addthis':1},{'addthis':4}];
    // console.log(obj);
    let quantity = 0;
    let price = 0;
    let total = 0;
    let finaltotal = 0;
    for (const product in products){
      quantity= products[product].quantity;
      price = products[product].price;
      total = quantity * price;
      finaltotal += total;
      //console.log(products[product].quantity);
      //console.log(quantity);
    }
    //console.log(quantity);
    console.log(finaltotal);
    this.payTotal = finaltotal;
    this.purchaseForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required]),
      pricePaid: finaltotal,
      addr: this.formBuilder.control('', [Validators.required]),
      credit: this.formBuilder.control('', [Validators.required]),
      products: products
    })
        
  }
  submitPurchase(){
    const values = this.purchaseForm.value;
    console.log(values);
    //implement adding to new purchases collection
  }

}
