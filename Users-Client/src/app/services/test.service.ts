import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from '../models/user';
import { UsersList } from '../models/UsersList';
import { environment } from "../../environments/environment";
@Injectable()
export class TestService {
  constructor(private http: HttpClient) {
  }

  getUrl():string{
    if(window.location.host.indexOf("localhost")> -1){
      return environment.apiUrl;
    }
    return  environment.apiUrl2;
  }
 getUsers(x: number, y: number): Observable<UsersList> {

  const headers= new HttpHeaders()
  .append('content-type', 'application/json')
  .append('Access-Control-Allow-Origin', '*')
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');
  const url = this.getUrl()+`/Get/${x}/${y}`;
  return this.http.get<UsersList>(url, {headers:headers, withCredentials:true});
}
}
