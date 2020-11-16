import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/services/user-service/user.models';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  userForm: FormGroup;
  error: string= '';
  @Output() createdUser = new EventEmitter<IUser>();

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: this.formBuilder.control('',[Validators.required]),
      pw: this.formBuilder.control('',[Validators.required]),
      role: this.formBuilder.control('',[Validators.required]),
    })
  }

  createUser(){
    const userInfo = this.userForm.value;
    this.userService.addUser(userInfo).subscribe((result: any)=>{
      this.createdUser.emit(result);

    },
      (err)=>{
        console.log('something went wrong');
        this.error = err;
      }
    )
  }

}
