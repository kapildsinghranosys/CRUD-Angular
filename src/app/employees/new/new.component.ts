import { Component, OnInit } from "@angular/core";
import { Employee } from "../employee";
import { DataService } from "../../services/data.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { tap, first } from "rxjs/operators";
import { MatDatepickerInputEvent } from "@angular/material";

@Component({
  selector: "app-emp-new",
  templateUrl: "./new.component.html",
  styleUrls: ["./new.component.scss"]
})
export class NewComponent implements OnInit {
  employee: Employee;
  empAddForm: FormGroup;
  loading: boolean = false;
  success: boolean = false;
  designationList: any;
  departmentList: any;
  roleList: any;
  maxDate: Date;
  age:any;

  constructor(
    private _dataServices: DataService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.maxDate = new Date();
  }

  ngOnInit() {
    this._dataServices.readDesignationList().subscribe(data => {
      this.processDesignation(data);
    });
    this._dataServices.readDepartmentList().subscribe(data => {
      this.processDepartment(data);
    });
    this._dataServices.readRoleList().subscribe(data => {
      this.processRole(data);
    });

    this.empAddForm = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
      designation: ["", [Validators.required]],
      department: ["", [Validators.required]],
      dob: ["", [Validators.required]],
      age: [this.age],
      doj: ["", [Validators.required]],
      img: [""],
      role: ["", [Validators.required]]
    });
  }

  get name() {
    return this.empAddForm.get("name");
  }
  get email() {
    return this.empAddForm.get("email");
  }
  get password() {
    return this.empAddForm.get("password");
  }
  get dob() {
    return this.empAddForm.get("dob");
  }
  get designation() {
    return this.empAddForm.get("designation");
  }
  get department() {
    return this.empAddForm.get("department");
  }
  get doj() {
    return this.empAddForm.get("doj");
  }
  get role() {
    return this.empAddForm.get("role");
  }

  async submitHandler() {
    this.loading = true;

    const formValue = this.empAddForm.value;
    //console.log(formValue);

    try {
      this._dataServices.addEmployee(formValue).subscribe(data => {
        this.addResult(data);
      });
    } catch (e) {
      console.log("error");
      console.log(e);
    }

    this.loading = false;
  }

  addResult(data) {
    if (data.success === 1) {
      this.router.navigate(["/employees"]);
    }
  }

  processDesignation(data) {
    this.designationList = data;
  }
  processDepartment(data) {
    this.departmentList = data;
  }
  processRole(data) {
    this.roleList = data;
  }
  ageCount(event):void {
    var timeDiff = Math.abs(Date.now() - event.value);
    this.age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365);
    this.empAddForm.controls['age'].setValue(this.age+' years');    
  }
}
