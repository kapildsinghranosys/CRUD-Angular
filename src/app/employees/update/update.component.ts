import { Component, OnInit } from "@angular/core";
import { Employee } from "../employee";
import { DataService } from "../../services/data.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { tap, first } from 'rxjs/operators';

@Component({
  selector: "app-emp-update",
  templateUrl: "./update.component.html",
  styleUrls: ["./update.component.scss"]
})
export class UpdateComponent implements OnInit {
  employee: Employee;
  empUpdateForm: FormGroup;
  loading:boolean = false;
  success:boolean = false;
  designationList: any;
  departmentList: any;
  roleList:any;
  age:any;


  constructor(
    private _dataServices: DataService, 
    private route:ActivatedRoute, 
    private fb: FormBuilder,
    private redirectRoute:Router
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get("id");
    this._dataServices.getEmployee(id).subscribe(data => {
      this.processResult(data);
    });

    this._dataServices.readDesignationList().subscribe(data => {
      this.processDesignation(data);
    });
    this._dataServices.readDepartmentList().subscribe(data => {
      this.processDepartment(data);
    });
    this._dataServices.readRoleList().subscribe(data => {
      this.processRole(data);
    });
    
  }

  processResult(data) {
    //console.log(data);
    if (Object.keys(data).length > 0) {
      this.employee = data;
      this.empUpdateForm = this.fb.group({
        id: [this.employee.id],
        name: [this.employee.name, [
          Validators.required
        ]],
        email: [this.employee.email,[
          Validators.required,
          Validators.email
        ]],
        designation: [this.employee.designation, [
          Validators.required
        ]],
        department: [this.employee.department, [
          Validators.required
        ]],
        dob: [this.employee.dob, [
          Validators.required
        ]],
        age: this.employee.age,
        doj: [this.employee.doj, [
          Validators.required
        ]],
        img: this.employee.img,
        role:[this.employee.role, [
          Validators.required
        ]]
      });
    } else {
      this.redirectRoute.navigate(['/employees']);
    }
  }

  get name(){
    return this.empUpdateForm.get('name');
  }
  get email(){
    return this.empUpdateForm.get('email');
  }
  get dob(){
    return this.empUpdateForm.get('dob');
  }
  get designation(){
    return this.empUpdateForm.get('designation');
  }
  get department(){
    return this.empUpdateForm.get('department');
  }
  get doj(){
    return this.empUpdateForm.get('doj');
  }
  get role(){
    return this.empUpdateForm.get('role');
  }

  submitHandler(){
    
    this.loading = true;

    const formValue = this.empUpdateForm.value;
    //console.log(formValue);

    try{            
      this._dataServices.updateEmployee(formValue.id, formValue)
      .subscribe(data => {
        this.updateResult(data);
      });      
    }catch(e){
      console.log('error');
      console.log(e);
    }
    
    this.loading=false;
  }

  updateResult(data) {
    if(data.success === 1){
      this.success = true;
      setTimeout(() => {
        this.success = false;
      }, 5000);
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
    this.empUpdateForm.controls['age'].setValue(this.age);    
  }
}
