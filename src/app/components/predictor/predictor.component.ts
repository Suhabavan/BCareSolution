import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-predictor',
  templateUrl: './predictor.component.html',
  styleUrls: ['./predictor.component.css']
})
export class PredictorComponent  {
  apiUrl : string;
  email:string;
  constructor(private http: HttpClient,private router:Router,private snackBar:MatSnackBar){
    this.apiUrl=environment.apiURL;
    this.email=sessionStorage.getItem('globalEmail');
  }
  messages: string[] = [];//array that hold the record of each string in chat
  lastUserMessage = ""; //keeps track of the most recent input string from the user
  botMessage = "";//var keeps track of what the chatbot is going to say
  botName = "Pink bot"; //name of the chatbot
  talking = true; //when false the speach function doesn't work
  search:string = '';
  @ViewChild("chatbox",{static:false}) inputField;
  num:number=0;

newEntry(message:string){
  debugger;
  this.inputField.nativeElement.value = "";
  if(message!=null){
    this.lastUserMessage=message;

    //Initial Message PinkBot
    if(this.num==0){
      this.messages.push("<b style='color:rgb(255, 0, 128);'>PinkBot: </b>Hi I'm <b style='font-weight: 500; color: rgb(255, 0, 128);'>PinkBot</b>. I'm here to help you !!&nbsp;")
      this.messages.push("<b style='color:rgb(255, 0, 128);'>PinkBot: </b>To schedule an appointment with a doctor type <b>APPOINTMENT</b>");
      this.num=1;
    }


    //this.Speech(this.lastUserMessage);  //says what the user typed outloud
    document.getElementById("chatbox").nodeValue = "";
        //To Book an Appointment
        if(this.lastUserMessage.toUpperCase()=="APPOINTMENT"){
          if(sessionStorage.getItem('globalEmail')){
            var appointment={"emailId":this.email}
            this.http.post<any>(this.apiUrl+'chatBot/appointment',appointment ).subscribe(result => {
              this.messages.push("<b>User: </b> "+this.lastUserMessage);
              this.messages.push("<b style='color:rgb(255, 0, 128);'>PinkBot: </b> " + result['Answer']);
              this.Speech(result['Answer']);
              for (var i = 0; i < this.messages.length; i++) {
                document.getElementById("chatlog" + i).innerHTML = this.messages[i];
                }
              });
          }
        }
        else{
          var usermessage = {"question":this.lastUserMessage}
          this.http.post<any>(this.apiUrl+'chatbot/chat', usermessage ).subscribe(result => {
            this.messages.push("<b>User: </b> "+this.lastUserMessage);
            this.messages.push("<b style='color:rgb(255, 0, 128);'>PinkBot: </b> " + result['Answer']);
            this.Speech(result['Answer']);
            for (var i = 0; i < this.messages.length; i++) {
              document.getElementById("chatlog" + i).innerHTML = this.messages[i];
              }
            },
            error => {
              this.messages.push("<b>User: </b> "+this.lastUserMessage);
              this.messages.push("<b style='color:rgb(255, 0, 128);'>PinkBot: </b> " + "I couldn't understand");
              this.Speech("I couldn't understand");
              for (var i = 0; i < this.messages.length; i++) {
                document.getElementById("chatlog" + i).innerHTML = this.messages[i];
                }
              });
        }

    //this.chatBotResponse();
    //this.messages.push("<b style='color:rgb(255, 0, 128);'>PinkBot: </b> " + this.botMessage);
    //this.Speech(this.botMessage);
    //outputs the last few array elements of messages to html
    /*
    for (var i = 0; i < this.messages.length; i++) {
        document.getElementById("chatlog" + i).innerHTML = this.messages[i];
    }
    */
  }

}

chatBotResponse(){

  this.talking=true;
  this.botMessage="I couldn't understand";
  var greetings:string[] = ['Hi', 'hi','hello','Hello','hey'];
    if (greetings.includes(this.lastUserMessage)) {
    const hi = ['Hi','Howdy','Hello']
    this.botMessage = hi[Math.floor(Math.random()*(hi.length))];
  }

  var chatBotName:string[] = ['name','Name', 'what is your name','what is your name?',
  'What is your name ?','What is your name'];
  if (chatBotName.includes(this.lastUserMessage)) {
    this.botMessage = 'My name is ' + this.botName;
  }

  var chatBotName:string[] = ['Potter', 'potter','who is vignesh',
  'who is Vignesh'];
  if (chatBotName.includes(this.lastUserMessage)) {
    this.botMessage = "Number one dubakoor in the Universe!!";
  }
}

Speech(say:string) {
  if ('speechSynthesis' in window && this.talking) {
   var utterance = new SpeechSynthesisUtterance(say);
    speechSynthesis.speak(utterance);
  }
}

}
