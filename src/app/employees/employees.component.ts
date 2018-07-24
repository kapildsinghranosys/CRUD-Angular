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
    showSpinner: boolean;
    selectedEmp: Employee;
    employees:Employee[] ;
    private _url: string = environment.apiUrl;
    private _paginator: MatPaginator;
    private _sort: MatSort;
    
    //displayedColumns = ['id','img', 'name','email','age','dob','password','doj','department','designation','role'];  
    displayedColumns = ['id','img', 'name','email','age','doj','department','designation','role'];  
    
    dataSource = new MatTableDataSource(this.employees);
    @ViewChild(MatSort) set matSort(ms: MatSort) {
      this._sort = ms;
      this.setDataSourceAttributes();
    }
    @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
      this._paginator = mp;
      this.setDataSourceAttributes();
    }
    setDataSourceAttributes() {
      this.dataSource.paginator = this._paginator;
      this.dataSource.sort = this._sort;
  
      if (this._paginator && this._sort) {
        this.applyFilter('');
      }
    }

    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }
    
    constructor(private _dataservice:DataService, private router:Router) {  
    }
  
    ngOnInit() {
      this.showSpinnerfn();
      this._dataservice.readEmployeeList()
      .subscribe(
        (data)=> this.processResult(data),
        (err)=> console.log(err)
      );
      this.dataSource.sort = this._sort;
      this.dataSource.paginator = this._paginator;
    }
    
    processResult(data) {
      this.employees = data;
      this.dataSource.data = this.employees;
      this.hideSpinnerfn();
    }
  
    onSelect(emp: Employee): void {
      this.selectedEmp = emp;
      //console.log(this.selectedEmp);
      //console.log('user row select: ', event);
      this.selectedEmp = emp;
      //console.log('selected list: ', this.selectedEmp);
      this.router.navigate(["/employees/view/"+this.selectedEmp.id]);
      
    }      
    
    showSpinnerfn(){
      this.showSpinner = true;
    }

    hideSpinnerfn(){
      this.showSpinner = false;
    }
  }