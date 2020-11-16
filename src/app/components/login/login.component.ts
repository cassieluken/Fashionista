import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login-service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string = '';

  constructor(private router: Router, private loginService: LoginService, protected formBuilder: FormBuilder, private currencyPipe: CurrencyPipe) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
        name: this.formBuilder.control('',[Validators.required]),
        pw: this.formBuilder.control('',[Validators.required]),
        //role: this.formBuilder.control('',[Validators.required])
    });
    // this.loginForm.get('name').valueChanges.subscribe((input)=>{
    //   console.log(input);
    //   input
    // });
  }
 login(){
   const loginCredentials = this.loginForm.value; //{name:,pw:}
   console.log(loginCredentials);
   console.log('in login');
   
   this.loginService.login(loginCredentials).subscribe((result:any)=>{
      
      console.log(result);
      this.loginService.$user.next(result);
      //receives JWT 
      //localStorage.setItem('JWT','JWT');
      if(result.role === 'user'){
        console.log(result.role);
        this.router.navigate(['/','home']); 
      }
      else{
        console.log('else:');
        console.log(result.role);
        this.router.navigate(['/','adminHome']); //change to admin portal
      }
   },
   (err)=>{
      console.log('wrong credentials');
      //display msg on login.html
      this.error = err;
   }
   )
 }
 
}
