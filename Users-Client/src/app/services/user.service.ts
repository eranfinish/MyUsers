import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import { HttpErrorHandler, HandleError } from '../services/http-error-handler.service';
import { environment } from "../../environments/environment";
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private handleError: HandleError;
  UserInfo:User;
  getUrl():string{
   if(window.location.host == "localhost"){
     return environment.apiUrl;
   }
   return  environment.apiUrl2;
 }
url:string =  this.getUrl();
constructor(private http:HttpClient) {

 }


 setUserInfo(usr:User) {
   console.log(usr);
   try {
    this.UserInfo = usr;
  }
   catch(err) {
     console.error(err);
   }

 }
 getUserInfo():User{
   return this.UserInfo;
 }
 addUser(userSave:User):Observable<any>{
  const headers= new HttpHeaders()
  .append('content-type', 'application/json')
  .append('Access-Control-Allow-Origin', '*')
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');
return this.http.post(this.url+"/add", userSave, {headers:headers, responseType: 'text', withCredentials:true});

// .pipe(
//   catchError( this.handleError('addUser')));


}
deleteUser(id:number):Observable<any>{
  const headers= new HttpHeaders()
  .append('content-type', 'application/json')
  .append('Access-Control-Allow-Origin', '*')
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');
  return this.http.delete(this.url+"/delete/"+id,{headers, responseType: 'text', withCredentials:true})
  // .pipe(
  //   catchError(this.handleError('deleteUser', id))
  // );
}

updateUser(userSave:User):Observable<any>{
  const headers= new HttpHeaders()
  .append('content-type', 'application/json')
  .append('Access-Control-Allow-Origin', '*')
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');
   return this.http.put(this.url+"/update",userSave,{headers, responseType: 'text', withCredentials:false})
  //  .pipe(
  //   catchError(this.handleError('updateUser'))
  //   );
}
}

