import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product-service/product.service';
import { IProduct } from 'src/app/services/product-service/product.models';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  productForm: FormGroup;
  error: string = '';
  @Output() createdProduct = new EventEmitter<IProduct>();

  constructor(private currencyPipe: CurrencyPipe, private formBuilder: FormBuilder, private router: Router, private productService: ProductService) { }

  // Init the form when starting the view.
  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required]),
      type: this.formBuilder.control('', [Validators.required]),
      image: this.formBuilder.control('', [Validators.required]),
      price: this.formBuilder.control('', [Validators.required]),
      quantity: this.formBuilder.control('', [Validators.required])
    });

    // this.productForm.get('price').valueChanges.subscribe((input)=>{
    //   console.log(input);
    // });

  }

  // Manage the submit action and create the new product.
  createProduct() {
    const productInfo = this.productForm.value;
    //console.log(productInfo);
    //console.log('productINFO');

    this.productService.addProduct(productInfo).subscribe((result: any) => {
      //console.log("Product Result:");
      //console.log(result);
      this.createdProduct.emit(result); //fixed ngOnchanges
      //this.router.navigate(['/', 'home']);
    },
      (err) => {
        console.log('something went wrong');
        //display msg on login.html
        this.error = err;
      })
  }



}
