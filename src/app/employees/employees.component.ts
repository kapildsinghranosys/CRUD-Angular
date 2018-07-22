import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Employee } from './employee';
import { DataService } from './../services/data.service';
//import { AppConfig } from '../app.config';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-emp-root',
    templateUrl: './employees.component.html',
    styleUrls:['./employees.component.scss']
})
export class EmployeesComponent implements OnInit  {
    selectedEmp: Employee;
    employees:Employee[] ;
    private _url: string = environment.apiUrl;

    
    //displayedColumns = ['id','img', 'name','email','age','dob','password','doj','department','designation','role'];  
    displayedColumns = ['id','img', 'name','email','age','doj','department','designation','role'];  
    
    dataSource = new MatTableDataSource(this.employees);
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }
    
    constructor(private _dataservice:DataService, private router:Router) {
  
    }
  
    ngOnInit() {
      this._dataservice.readEmployeeList()
      .subscribe(
        (data)=> this.processResult(data),
        (err)=> console.log(err)
      );
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
    
    processResult(data) {
      this.employees = data;
      this.dataSource.data = this.employees;
    }
  
    onSelect(emp: Employee): void {
      this.selectedEmp = emp;
      //console.log(this.selectedEmp);
      //console.log('user row select: ', event);
      this.selectedEmp = emp;
      //console.log('selected list: ', this.selectedEmp);
      this.router.navigate(["/employees/view/"+this.selectedEmp.id]);
      
    }      
  }