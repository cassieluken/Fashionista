import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login-service/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  error: string = '';

  constructor(private router: Router, private loginService: LoginService, protected formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
        name: this.formBuilder.control('',[Validators.required]),
        pw: this.formBuilder.control('',[Validators.required]),
        role: this.formBuilder.control('',[Validators.required])
    });
  }
 
  register(){
    const userCredentials = this.registerForm.value; //{name:,pw:}
    console.log(userCredentials);
    console.log('registering');
    this.loginService.register(userCredentials).subscribe((result)=>{
       console.log(result);
       this.router.navigate(['/','login']);
    },
    (err)=>{
       console.log('wrong credentials');
       //display msg on login.html
       this.error = err;
    }
    )
  }

}
