import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get('http://localhost:3000/api/admin/getAllUsers');
  }
  addUser(data) {
    return this.http.post('http://localhost:3000/api/admin/createUser', data);
  }
  deleteUsers(id) {
    return this.http.delete(`http://localhost:3000/api/admin/deleteUser/${id}`);
  }
  update(data){
    console.log("in service:");
    console.log(data);
    return this.http.put('http://localhost:3000/api/admin/updateUser',data);
  }
}

// export interface User {
//   name: String;
//   pw: String;
//   role: String;
// }
