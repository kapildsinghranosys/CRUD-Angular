import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DISABLED } from '@angular/forms/src/model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  private loginForm: FormGroup;
  private result: JSON;
  private loading:boolean = false;
  redirectUrl: string;

  constructor(private fb: FormBuilder,
    private _authService: AuthService,
    private route: Router) {

   }

  ngOnInit() {
    if(this._authService.is_LoggedIn){
      this.route.navigate(['/employees']);
    }
    this.loginForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required],
      keepLogin:[false]
    });

  }

  get email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }

  submitHandler() {
    this.loading = true;

    const formValue = this.loginForm.value;
    this._authService.login(formValue)
      .subscribe(
        (data)=> this.prosessResp(data),
        (err)=>  console.log(err)
      );
    this.loading = false;
  }

  prosessResp(resp){
    if(resp.success == 1){
      this._authService.accessResp(resp);
      console.log('login');
      this.route.navigate(['/employees']);
    }
    if(resp.success == 0){
      console.log('error');
    }    
  }

  forgetPassword(){
    //console.log("forget password method called");
  }
}
