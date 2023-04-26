import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;
  images=["../../../../assets/work1.svg","../../../../assets/work.svg","../../../../assets/work2.svg"];
  text=["Fully trained workers","Friendly environment","100% secure contracts"]
  number=0
  logo=this.images[0]
  info=this.text[0]
  
  rightChange(){
    this.number++;
    if(this.number>this.images.length-1)this.number=0;
    this.logo=this.images[this.number];
    this.info=this.text[this.number];
  }

  leftChange(){
    this.number--;
    if(this.number<0)this.number=this.images.length-1;
    this.logo=this.images[this.number];
    this.info=this.text[this.number];
  }
}
