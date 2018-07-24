import { Component } from "@angular/core";
import {
  BreakpointObserver,
  Breakpoints  
} from "@angular/cdk/layout";
import { Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService } from "../services/auth.service";


@Component({
  selector: "app-nav",
  templateUrl: "./app-nav.component.html",
  styleUrls: ["./app-nav.component.scss"]
})
export class AppNavComponent {

  isLoggedIn:boolean;
  private subscription: Subscription;

  constructor(private breakpointObserver: BreakpointObserver,
              private _authService: AuthService) {
  }
  ngOnInit() {
    this.subscription = this._authService.isLoggedIn.subscribe(
      (val) => {
        this.isLoggedIn = val;
      }
    );
    console.log("Is user logged in: "+this.isLoggedIn);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));  

    onLogout(){
    this._authService.logout();
  }
}
