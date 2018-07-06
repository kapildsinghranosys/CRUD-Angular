import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

import { EmployeesComponent } from './employees/employees.component';
import { NewComponent } from './employees/new/new.component';
import { DetailComponent } from './employees/detail/detail.component';
import { UpdateComponent } from './employees/update/update.component';

const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeesComponent },
  { path: 'employees/add', component: NewComponent },
  { path: 'employees/view/:id', component: DetailComponent },
  { path: 'employees/update/:id', component: UpdateComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports:[ RouterModule ]
})
export class AppRoutingModule { }
