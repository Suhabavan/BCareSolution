import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { isUndefined } from 'util';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {

  data:any;
  settings:any;
  value:string;
  EmailId:string;
  HttpResponse:string;
  pregnant:any;
  diagnosticTest:any;
  options:any;
  apiUrl:string;
  dataSet:number[];

  constructor(private router:Router,private snackBar:MatSnackBar,private http: HttpClient) {
    this.apiUrl=environment.apiURL;
    this.EmailId = sessionStorage.getItem('globalEmail');
   }

  ngOnInit() {
    this.data = [
      "Lump in the breast","Thickening or swelling in breast","Lump in underarm(armpit)","Pain in breast","Irritation of breast skin","Change in shape or size of breast","Pain in nipple or in its area","Pulling in of the nipple",
      "Nipple discharge including blood","backbone pain"
    ];

    this.settings = {
      singleSelection: false,

      allowSearchFilter: true,

      clearSearchFilter: true,
      maxHeight: 150,
      itemsShowLimit: 1

    };

    this.EmailId = sessionStorage.getItem('globalEmail');
    //this.HttpResponse http check email get
    this.HttpResponse="true";
    if(this.HttpResponse=="true"){
        this.value="true";
    }
    else if(this.HttpResponse=="false"){
      this.value="false";
    }
    else console.log('');

  }

  userDetails(form:NgForm){
    if(form.value.userName=="" || form.value.age=="" || form.value.weight==""){
      this.snackBar.open("Please fill all fields !!!",'',{
        duration:2000,
        verticalPosition:'bottom'
      });
      return;
    }

    var userDetails = form.value;
    if(sessionStorage.getItem('globalEmail')!=null &&
     sessionStorage.getItem('globalEmail')!="" &&
     sessionStorage.getItem('globalEmail')!=undefined &&
     !isUndefined(sessionStorage.getItem('globalEmail'))){
          userDetails["emailId"]=sessionStorage.getItem('globalEmail');
    }
    else{
      this.snackBar.open("Please login first !!!",'',{
        duration:3000,
        verticalPosition:'bottom'
      });
      return;
    }
    console.log(JSON.stringify(userDetails));

    this.http.post<any>(this.apiUrl+'quickcheckup', userDetails).subscribe(result =>{
      sessionStorage.setItem('probability',result['probability']);
      sessionStorage.setItem('dataSet',result['clusterData']);
      sessionStorage.setItem('userCluster',result['userCluster']);
      if(sessionStorage.getItem('userCluster')!=""
      && sessionStorage.getItem('clusterData')!=""
      && sessionStorage.getItem('probability')!=""){
        this.router.navigate(['/cluster']);
      }
    });

  }

}



