import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { EmployeesComponent } from "./employees/employees.component";
import { NewComponent } from "./employees/new/new.component";
import { DetailComponent } from "./employees/detail/detail.component";
import { UpdateComponent } from "./employees/update/update.component";
import { LoginComponent } from "./login/login/login.component";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  { path: "", redirectTo: "/employees", pathMatch: "full" },
  // {
  //   path: "employees",
  //   component: EmployeesComponent,
  //   canActivate: [AuthGuard],
  //   children: [
  //     {
  //       path: "",
  //       canActivateChild: [AuthGuard],
  //       children: [
  //         { path: "add", component: NewComponent },
  //         { path: "view/:id", component: DetailComponent },
  //         { path: "update/:id", component: UpdateComponent }
  //       ]
  //     }
  //   ]
  // },
  {
    path: "employees",
    component: EmployeesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "employees/add",
    component: NewComponent,
    canActivate: [AuthGuard]
  }
  ,
  {
    path: "employees/view/:id",
    component: DetailComponent,
    canActivate: [AuthGuard]
  }
  ,
  {
    path: "employees/update/:id",
    component: UpdateComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: "login", 
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
