import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { Employee } from "../employee";
import { DataService } from "../../services/data.service";
import { MatDialog } from "@angular/material";
import { DialogConfirmComponent } from "../../dialog-confirm/dialog-confirm.component";

@Component({
  selector: "app-emp-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"]
})
export class DetailComponent implements OnInit {
  employee: Employee;
  selectedEmp: Employee;
  designation: any;
  department: any;
  role: any;
    

  constructor(
    private route: ActivatedRoute,
    private _dataServices: DataService,
    private dialog: MatDialog,
    private router:Router
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get("id");
    this._dataServices.getEmployee(id)
    .subscribe(
      (data) => this.processResult(data),
      (err)=> console.log(err)
    );    
  }

  confirmDelete() {
    console.log("Pop-up of confirmation delete");
    let dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: "300px",
      data: `Are you sure to delete ${this.employee.name.toUpperCase()}'s record`
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`dialog closed: ${result}`);
      this.deleteEmployee(result);
    });
  }

  deleteEmployee(status) {
    if (status) {
      this._dataServices.deleteEmployee(this.employee.id)
      .subscribe(
        (data) => this.processResultDel(data),
        (err) => console.log(err)
      );
    }
  }

  processResult(data) {
    //console.log(data);
    if (Object.keys(data).length > 0) {
      this.employee = data;
      this._dataServices.readDesignationList()
      .subscribe(
        (data) => this.processDesignation(data),
        (err) => console.log(err)
      );

      this._dataServices.readDepartmentList()
      .subscribe(
        (data) => this.processDepartment(data),
        (err) => console.log(err)
      );
        
      this._dataServices.readRoleList()
      .subscribe(
        (data) => this.processRole(data),
        (err) => console.log(err)
      );

    } else {
      console.log("employee table is empty");
    }
  }
  processResultDel(data) {
    console.log(data);
    if (Object.keys(data).length > 0) {
      this.router.navigate(["/employees"]);
    } else {
      console.log("empty");
    }
  }  
  processDesignation(data) {
    this.designation = data.find(item => item.id === this.employee.designation);
    this.designation = this.designation.designation_name;
  }
  processDepartment(data) {
    this.department = data.find(item => item.id === this.employee.department);
    this.department = this.department.department_name;
  }
  processRole(data) {
    this.role = data.find(item => item.id === this.employee.role);    
    this.role = this.role.role;
  }
  
}
