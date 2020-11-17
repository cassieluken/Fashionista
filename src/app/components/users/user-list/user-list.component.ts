import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/services/user-service/user.models';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: Array<IUser> = [];
  userForm: FormGroup;
  updatedUser: IUser = null;
  successMsg: String = '';
  @Input() userToDisplay: IUser = null;
  constructor(protected userService: UserService, protected formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loadAll();
  }
  // If new product created, we add it to the list.
  ngOnChanges(): void {
    if (this.userToDisplay !== null) {
      console.log(this.userToDisplay);
      this.users.push(this.userToDisplay);
    }
    //this.loadAll();
  }

  // Delete a user. 
  delete(id: string) {
    this.userService.deleteUsers(id).toPromise().then((result: any) => this.loadAll());
  }

  // Load all users.
  private loadAll() {
    console.log('in loadAll');
    this.userService.getUsers().toPromise().then((res: Array<IUser>)=>{
      console.log(res);
      this.users = res;  //helps ngOnChanges
    });

  }
  
  updateUser(){
    const values = this.userForm.value;
    console.log(values);
    //call service to update product by index and 
    this.userService.update(values).toPromise().then((result)=>{
      const index = this.users.findIndex(x=>x._id === values._id); //this one too
      this.users[index] = values; //put inside service call
    })
    this.successMsg = `You have updated user: ${this.updatedUser.name}, you may now close this menu`;

    
  }
  showUpdateModal(user){
    this.updatedUser = user;
    console.log(this.updatedUser._id);
    this.userForm = this.formBuilder.group({
      name: this.formBuilder.control(user.name, [Validators.required]),
      pw: this.formBuilder.control(user.pw, [Validators.required]),
      role: this.formBuilder.control(user.role, [Validators.required]),
      _id: this.updatedUser._id
    })
  }
}
