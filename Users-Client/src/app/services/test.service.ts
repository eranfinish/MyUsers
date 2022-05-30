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
    console.log( window.location.origin );
  //   if(window.location.host == "localhost"){
  //     return environment.apiUrl1;
  //   }
  //  else
   if(window.location.host.indexOf("localhost:4200") > -1){
      return environment.apiUrl;
    }
  //  else{
  //   return  environment.apiUrl3 +"/UserList/api/Test"
  //  }

   return  window.location.origin + '/UsersList-api/api/Test';
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
