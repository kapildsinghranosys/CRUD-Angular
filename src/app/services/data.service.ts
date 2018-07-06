import { Injectable } from "@angular/core";
import { AppConfig } from "../app.config";
import { HttpClient } from "@angular/common/http";
import { Employee } from "../employees/employee";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DataService {
  private _url: string = AppConfig.apiEndpoint;
  private departmentList:Observable<any>;
  private designationList:Observable<any>;
  private roleList:Observable<any>;


  constructor(private http: HttpClient) {}

  readEmployeeList(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this._url + "employee/read.php");
  }

  getEmployee(id): Observable<Employee> {
    return this.http.get<Employee>(this._url + "employee/get.php?id=" + id);
  }

  updateEmployee(id, empObj): Observable<any> {
    return this.http.post(this._url + "employee/update.php?id=" + id, empObj, {
      responseType: "json"
    });
  }

  addEmployee(empObj): Observable<any> {
    return this.http.post(this._url + "employee/add.php", empObj, {
      responseType: "json"
    });
  }

  deleteEmployee(id): Observable<any> {
    return this.http.post(this._url + "employee/delete.php?id=" + id, {
      responseType: "json"
    });
  }

  // postFile(formData) {
  //   return this.http.post(this._url + "employee/uploadUserImage.php", formData);
  // }


  /*Read Designation*/
  readDesignationList(): Observable<any> {
    if(!this.designationList){
      this.designationList = this.http.get(this._url + "designation/read.php");
    }
    return this.designationList;      
  }
  /*Read Department*/
  readDepartmentList(): Observable<any> {
    if(!this.departmentList){
      this.departmentList = this.http.get(this._url + "department/read.php");
    }
    return this.departmentList;    
  }
  /*Read Role(Accessability)*/
  readRoleList(): Observable<any> {
    if(!this.roleList){
      //console.log('hit server');
      this.roleList = this.http.get(this._url + "role/read.php");
    }    
    return this.roleList;
  }
}
