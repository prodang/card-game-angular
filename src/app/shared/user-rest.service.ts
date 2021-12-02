import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {record} from "./model/record.model";

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

  getRecords(){
    return this.http.get<record[]>(this.url+'/records');
  }

  getRecordsPersonals(user: any){
    return this.http.get<record[]>(this.url+'/records/'+user);
  }

  postRecord(body:any){
    return this.http.post(this.url+'/records', body);
  }

  deleteRecordsPersonals(){
    return this.http.delete(this.url+'/records');
  }

  postGame(body:any){
    return this.http.post(this.url +'/games',body);
  }

  getGame(){
    return this.http.get(this.url+'/games');
  }
}
