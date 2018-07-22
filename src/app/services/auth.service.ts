import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _url: string = environment.apiUrl;
  is_LoggedIn: boolean = false;  
  //isLoggedIn =  new Subject<boolean>();
  isLoggedIn: Subject<boolean> = new BehaviorSubject<boolean>(false);
  
  private setLocalStorage:boolean;
  private response: JSON;
  
  constructor(private http: HttpClient, private route: Router) {
    let storedToken:string = localStorage.getItem('user');
    //console.log(storedToken);
    if(storedToken){
      this.is_LoggedIn=true;
      this.isLoggedIn.next(true);
    }
  }

  apiUrl(){
    return this._url;
  }

  login(loginData):Observable<any>{
     this.setLocalStorage = loginData.keepLogin;
     
    //  this.http.post(this._url + "auth/login.php", loginData)
    //  .subscribe((resp)=>{
    //     this.accessResp(resp);
    //  });
     return this.http.post(this._url + "auth/login.php", loginData, {responseType: "json" });
  }

  accessResp(data){
    
    //console.log(data.success);
    //if(data.success == 1){
      this.response = data;
      this.is_LoggedIn=true;
      this.isLoggedIn.next(true);
      //if(this.setLocalStorage){
      localStorage.setItem('user', JSON.stringify(this.response));
        //let storedToken:string = localStorage.getItem('user');
    //console.log(storedToken);
      //}      
    //}
  }

  logout(){
    localStorage.removeItem('user');
    this.is_LoggedIn=false;
    this.isLoggedIn.next(false);
    this.route.navigate(['/login']);
  }
}
