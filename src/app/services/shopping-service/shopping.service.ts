import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  constructor(private http: HttpClient) { }
  //WISHLIST CRUD
  addToWishlist(data){
    return this.http.post('http://localhost:3000/api/users/addToWishlist',data);
  }
  getWishlist(){
    return this.http.get('http://localhost:3000/api/users/getWishlist');
  }
  deleteProduct(id){
    console.log('id:');
    console.log(id);
    return this.http.delete(`http://localhost:3000/api/users/deleteProductWish/${id}`);
  }

  //delete from wishlist and post to cart
  moveToCart(id,data){
    console.log("MOVETOCART DATA")
    console.log(data);
    this.moveIt(data);
    return this.http.delete(`http://localhost:3000/api/users/deleteProductWish/${id}`);
  }
  moveIt(data){
    console.log("MOVEIT DATA")
    console.log(data);
    return this.http.post('http://localhost:3000/api/users/addToCart',data);
  }

  //CART CRUD
  deleteProductCart(id){
    console.log('id:');
    console.log(id);
    return this.http.delete(`http://localhost:3000/api/users/deleteProductCart/${id}`);
  }
  getCart(){
    return this.http.get('http://localhost:3000/api/users/getCart');
  }
  addToCart(data){
    return this.http.post('http://localhost:3000/api/users/addToCart',data);
  }

  
}
