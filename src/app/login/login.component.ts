import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Register} from '../model/Register';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginStatus:string;
  registorStatus:any;
  public register:Register;
  apiUrl : string;


  constructor(private http: HttpClient,private router:Router,private snackBar:MatSnackBar) {
    this.register=new Register();
    this.apiUrl=environment.apiURL;
  }

  ngOnInit() {
  }

  registration(form:NgForm){
    if(form.value.emailId=="" || form.value.password=="" || form.value.userName==""){
      this.snackBar.open("Please provide the credentials",'',{
        duration:2000,
        verticalPosition:'bottom'
      });
      return;
    }
      this.register.emailId=form.value.emailId;
      this.register.password=form.value.password;
      this.register.userName=form.value.userName;
      this.http.post<any>(this.apiUrl+'register', this.register).subscribe(result => {
        this.registorStatus=result.Response;

      if(this.registorStatus=="Registered Successfully"){
        this.snackBar.open("Registration Done Successfully. Please Login !!",'',{
          duration:2000,
          verticalPosition:'bottom'
        });
        this.router.navigate(['/home']);
      }
      else{
        this.snackBar.open("some thing went wrong please try again later !!!",'',{
          duration:2000,
          verticalPosition:'bottom'
        });
        this.router.navigate(['/home']);
      }
    },
    error=>{
      this.snackBar.open("Already registered please Login !!",'',{
        duration:2000,
        verticalPosition:'bottom'
      });
    });

  }


  loginValidation(form:NgForm){
    if(form.value.email=="" || form.value.password==""){
      this.snackBar.open("Please enter the credentials",'',{
        duration:2000,
        verticalPosition:'bottom'
      });
      return;
    }
    sessionStorage.setItem('globalEmail', form.value.email);
    this.http.post<any>(this.apiUrl+'login', form.value).subscribe(result => {
      this.loginStatus=result["LoginResponse"];
      if(this.loginStatus=="Login Successful"){
        sessionStorage.setItem('log', this.loginStatus);
        this.snackBar.open("Logged  In  Successfully !!!",'',{
          duration:2000,
          verticalPosition:'bottom'
        });
        sessionStorage.setItem("logusr", "logdout");
      this.router.navigate(['/home'])
      setTimeout(() => { var p=this.router.url;console.log(p),location.reload(); }, 500); //1000 for 1 sec waiter
      }
      else if(this.loginStatus=="Login Failed"){
        this.snackBar.open("Login failed. Please check the credentials !!!",'',{
          duration:2000,
          verticalPosition:'bottom'
        });
      }

      else{
        this.snackBar.open("some thing went wrong please try again later !!!",'',{
          duration:2000,
          verticalPosition:'bottom'
        });
        setTimeout(() => { this.router.navigate(['/home']); }, 500); //1000 for 1 sec waiter
      }
      });

    }

}
