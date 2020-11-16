import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/services/user-service/user.models';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  createdUser:  IUser = null;

  constructor() { }

  ngOnInit(): void {
  }
  onCreatedUser(createdUser: IUser) {
    this.createdUser = createdUser;
  }

}
