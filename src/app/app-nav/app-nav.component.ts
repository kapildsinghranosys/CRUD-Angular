import { Component } from "@angular/core";
import {
  BreakpointObserver,
  Breakpoints  
} from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";


@Component({
  selector: "app-nav",
  templateUrl: "./app-nav.component.html",
  styleUrls: ["./app-nav.component.scss"]
})
export class AppNavComponent {

  constructor(private breakpointObserver: BreakpointObserver) {}

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));  
}
