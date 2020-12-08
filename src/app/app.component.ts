import { BoundAttribute } from '@angular/compiler/src/render3/r3_ast';
import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Hackapp';
  login:Boolean=true;
  logout:Boolean=false;
  user ="babe";
  logusr='logedin'
  constructor(private router:Router) {

   }

  ngOnInit() {
    this.logusr=sessionStorage.getItem("logusr")
    if(this.logusr==null){
      this.logusr='logedin'
    }
  }

  logOut(){
    sessionStorage.removeItem('globalEmail');
    sessionStorage.removeItem('log');
    this.login=true;
    this.logout=false;
    sessionStorage.setItem("logusr", "logedin");
    location.reload()
  }

}
