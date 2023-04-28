import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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

  loginForm: FormGroup=this.builder.group({
    email: ['',[Validators.email,Validators.required]],
    password: ['',Validators.required],
  })

  get email() { return this.loginForm.controls['email'];}
  get password() { return this.loginForm.controls['password'];}

  constructor(public builder:FormBuilder) {}

  login(){
    console.log(this.loginForm.value.password)
  }

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
