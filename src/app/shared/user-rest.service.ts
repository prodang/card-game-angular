import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
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

  getRecordsPersonals(user: any, token: any){
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", token) ;
    return this.http.get<record[]>(this.url+'/records/'+user,{headers: headers});
  }

  postRecord(body:any, token:any){
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", token) ;
    /*let params = new HttpParams();
    params = params.set("punctuation", body.punctuation);
    params = params.set("cards", body.cards);
    params = params.set("disposedTime", body.disposedTime);*/

    console.log('LLEGO A POST: '+JSON.stringify(body));
    return this.http.post(this.url+'/records', JSON.stringify(body),{headers: headers});
  }

  deleteRecordsPersonals(token:any){
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", token) ;
    return this.http.delete(this.url+'/records',{headers: headers});
  }

  postGame(body:any, token:any){
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", token) ;
    return this.http.post(this.url +'/games',body,{headers: headers});
  }

  getGame(token:any){
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", token) ;
    return this.http.get(this.url+'/games',{headers: headers});
  }
}
