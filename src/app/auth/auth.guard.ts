import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private _authService: AuthService, private route:Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      //let url: string = state.url;
      //if(localStorage.getItem('currentUser')){         
      if(this._authService.is_LoggedIn){
        return true;
      }
      //this._authService.redirectUrl= url;      
      this.route.navigate(['/login']);
    
  }

  canActivateChild(
    next: ActivatedRouteSnapshot, state: RouterStateSnapshot  )
    : Observable<boolean> | Promise<boolean> | boolean {
      return this.canActivate(next,state);
    }
}
