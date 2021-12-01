import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserRestService {
  private url = 'http://fenw.etsisi.upm.es:10000';

  constructor(private http: HttpClient) { }

  getaUser(user: string){
    return this.http.get (this.url + '/users' + '/' + user);
  }

  postUser(user: any){
    return this.http.post(this.url +'/users',user);
  }

  loginUser(body: any){
    return this.http.get(this.url+'/users/login', {params: body, observe: 'response'});
  }
}
