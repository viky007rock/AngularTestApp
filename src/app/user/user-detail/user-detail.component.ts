import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserServiceService } from '../user-service/user-service.service'

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  searchForm: any = FormGroup;
  submitted = false;
  errorMessage="";
  user:any={};
  isError=false;
  constructor(private formBuilder: FormBuilder, private _userServiceService:UserServiceService) { }
  //Add user form actions
  get f() { return this.searchForm.controls; }
  onSubmit() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.searchForm.invalid) {
      return;
    }
    //True if all the fields are filled
    if (this.submitted) {
      this._userServiceService.getUserById(Number(this.searchForm.value.search))
      .subscribe(res=>{
        if(res=="Inavlid Token"){
          this.isError=true;
          this.errorMessage=res;
        }
        else{
          this.isError=false;
          this.user=res;
        }
      },
      error=>{
        if(error.status==404){
          this.isError=true;
          this.errorMessage="User Not Found"
        }
        else{
          this.isError=true;
          this.errorMessage=error.statusText;
        }
      })
    }

  }
  ngOnInit() {
    //Add User form validations
    this.searchForm = this.formBuilder.group({
      search: ['', [Validators.required]]
    });
  }

}
