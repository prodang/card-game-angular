import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthMngService {

  constructor() { }

  getToken(){
    return sessionStorage.getItem('token');
  }

  getUser(){
    return sessionStorage.getItem('user');
  }

  setToken(token: string){
    sessionStorage.setItem('token', token);
  }

  setUser(user: string){
    sessionStorage.setItem('user',user);
  }

  emptyAll(){
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }
}
