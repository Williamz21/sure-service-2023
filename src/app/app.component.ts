import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'sureservice';
  classToggled=false;
  topBarDisplay=false;
  sideNav=document.getElementById('sideNav') as any;
  open=true;

  constructor(public router: Router){}
  
  ngOnInit(): void {
    document.body.classList.add("bodyOnAll");
    this.onWindowResize()
  }

  toggleBar(){
    this.classToggled=!this.classToggled;
    this.open=!this.open;
    document.body.classList.toggle('bodyWidth');
    document.body.classList.toggle("bodyOnAll");
  }

  toggleBarMobile(){
    this.topBarDisplay=!this.topBarDisplay;
    document.body.classList.toggle('bodyMobile');
    document.body.classList.toggle('bodyWidth');
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    if(window.innerWidth<1200 && window.innerWidth>760){
      if(document.body.classList.contains('bodyOnAll')){
        document.body.classList.add('bodyWidth');
        document.body.classList.remove("bodyOnAll");
      }
      else if(document.body.classList.contains('bodyMobile')){
        document.body.classList.add('bodyWidth');
        document.body.classList.remove("bodyMobile");
      }
    }
    if(window.innerWidth>1200){
      if(document.body.classList.contains('bodyWidth')){
        document.body.classList.add('bodyOnAll');
        document.body.classList.remove("bodyWidth");
      }
      else if(document.body.classList.contains('bodyMobile')){
        document.body.classList.add('bodyOnAll');
        document.body.classList.remove("bodyMobile");
      }
    }
    if(window.innerWidth<760){
      if(document.body.classList.contains('bodyWidth')){
        document.body.classList.add('bodyMobile');
        document.body.classList.remove('bodyWidth');
      }
      else if(document.body.classList.contains('bodyOnAll')){
        document.body.classList.add('bodyMobile');
        document.body.classList.remove("bodyOnAll");
      }
    }
    if(window.innerWidth<1200 && window.innerWidth>760){
      this.open=false;
      this.classToggled=true;
    } 
    else {
      this.open=true;
      this.classToggled=false;
    } 
  }
}