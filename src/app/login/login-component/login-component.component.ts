import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';
import { LoginServiceService } from '../login-service/login-service.service'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})
export class LoginComponentComponent implements OnInit {

  loginForm: any = FormGroup;
  submitted = false;
  isError=false;
  errorMessage='';
  constructor(
    private formBuilder: FormBuilder,
    private _loginServiceService: LoginServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  //Add user form actions
  get f() { return this.loginForm.controls; }
  onSubmit() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    //True if all the fields are filled
    if (this.submitted) {
      this._loginServiceService.login(this.loginForm.value)
        .subscribe(res => {
            if (res.code == 0) {
              this.isError=false;
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('token', res.data.Token);
            this.router.navigate(["/user"]);
            }
            else{
              this.isError=true;
              this.errorMessage=res.message;
            }
          }); 
    }

  }
  ngOnInit() {
    //Add User form validations
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

}
