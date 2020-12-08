import { Component, OnInit,ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {environment} from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  email:string;
  value:any;
  track:string="false";
  apiUrl : string;
  @ViewChild("exercise",{static:false}) inputField;

  constructor(private http: HttpClient,private router:Router,private snackBar:MatSnackBar) {
    this.email=sessionStorage.getItem('globalEmail');
    this.apiUrl=environment.apiURL;
   }

  ngOnInit() {
    this.value="1";
    /*
    this.value=Math.floor(Math.random()*5);
    if(this.value=="0"){
      this.value=1;
    }
    */
    if(this.email==undefined || this.email==null){
        this.track="false";
    }
    else this.track="true";
  }

  event_list = [
    {
     event:' Event 1',
     eventDescription:'Yoga can be an effective low impact exercise.',
     img: '../assets/exercise/1.jpg',
     eventStartDate: new Date('2019/07/28'),
     eventEndingDate: new Date('2019/07/30')
   },
    {
     event:' Event 2',
     eventDescription:'Walk daily for atleast half an hour is recommended.',
     img: '../assets/exercise/2.jpg',
     eventStartDate: new Date('2020/05/20'),
     eventEndingDate: new Date('2020/05/24')
   },
   {
    event:' Event 3',
    eventDescription:'Self examine: Lumps or Thickening in underarm/breast.',
    img: '../assets/exercise/3.jpg',
    eventStartDate: new Date('2018/05/20'),
    eventEndingDate: new Date('2018/05/24')
  },
  {
    event:' Event 4',
    eventDescription:'Regorous activity for atleast half an hour a day.',
    img: '../assets/exercise/4.jpg',
    eventStartDate: new Date('2019/07/28'),
    eventEndingDate: new Date('2019/07/30')
  }
 ]


past_events = this.event_list.filter(event => event.eventEndingDate < new Date());


checkExerciseStatus(form:NgForm){
  if(form.value.exercise==""){
    this.snackBar.open("Please select Yes or No !!!",'',{
      duration:2000,
      verticalPosition:'bottom'
    });
    return;
  }
  var exercise={"emailId":this.email,"exerciseDone":form.value.exercise}
  this.http.post<any>(this.apiUrl+'exercisedataupdate', exercise).subscribe(result => {
  if(parseInt(result["DaysExercised"])>5){
      this.value="1";
  }
  else this.value=result["DaysExercised"];
  if(result["Gap"]!="0"){
    this.snackBar.open("You have failed to take exercise for "+result['Gap']+" day",'',{
      duration:3000,
      verticalPosition:'bottom'
    });
  }
  });
  form.reset();
  }



}
