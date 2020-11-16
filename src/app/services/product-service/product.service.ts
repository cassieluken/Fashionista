import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { IProduct, Product } from './product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(private http: HttpClient) { }

    getAllProducts(){
      return this.http.get('http://localhost:3000/api/admin/getProducts');
    }
    addProduct(data){
      console.log(data);
      return this.http.post('http://localhost:3000/api/admin/createProduct',data);
    }
    deleteProduct(id){
      console.log('id:');
      console.log(id);
      return this.http.delete(`http://localhost:3000/api/admin/deleteProduct/${id}`);
    }
    update(data){
      console.log("in service:");
      console.log(data);
      return this.http.put('http://localhost:3000/api/admin/updateProduct',data);
    }
}
