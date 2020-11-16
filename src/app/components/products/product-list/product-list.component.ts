import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProduct } from 'src/app/services/product-service/product.models';
import { ProductService } from 'src/app/services/product-service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  updatedProduct: IProduct = null;
  productForm: FormGroup;
  products: Array<IProduct> = [];
  @Input() productToDisplay: IProduct = null;

  constructor(protected productService : ProductService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loadAll();
    console.log('Product-list:');
  }

  // If new product created, we add it to the list.
  ngOnChanges(): void {
    if (this.productToDisplay !== null) {
      console.log(this.productToDisplay);
      this.products.push(this.productToDisplay);
    }
    //this.loadAll();
  }

  // Delete a product. 
  delete(id: string) {
    this.productService.deleteProduct(id).toPromise().then((result: any) => this.loadAll());
  }

  // Load all products.
  private loadAll() {
    console.log('in loadAll');
    this.productService.getAllProducts().toPromise().then((res: Array<IProduct>)=>{
      console.log(res);
      this.products = res;  //helps ngOnChanges
    });

  }

  updateProduct(){
    const values = this.productForm.value;
    console.log(values);
    //call service to update product by index and 
    this.productService.update(values).toPromise().then((result)=>{
      const index = this.products.findIndex(x=>x._id === values._id); //this one too
      this.products[index] = values; //put inside service call
    })
    
  }
  showUpdateModal(product){
    this.updatedProduct = product;
    console.log(this.updatedProduct._id);
    this.productForm = this.formBuilder.group({
      name: this.formBuilder.control(product.name, [Validators.required]),
      type: this.formBuilder.control(product.type, [Validators.required]),
      image: this.formBuilder.control(product.image, [Validators.required]),
      price: this.formBuilder.control(product.price, [Validators.required]),
      quantity: this.formBuilder.control(product.quantity, [Validators.required]),
      _id: this.updatedProduct._id
    })
  }
}
