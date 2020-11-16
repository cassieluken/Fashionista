import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {   }
  
  public $user : BehaviorSubject<string> = new BehaviorSubject<string>(null);
  
  login(user){
    return this.http.post('http://localhost:3000/api/users/login',user);
  }
  register(user){
    return this.http.post('http://localhost:3000/api/users/register',user);
  }

}
