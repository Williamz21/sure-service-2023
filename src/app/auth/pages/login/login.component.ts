import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;
  errorLogin=false;
  images=["../../../../assets/work1.svg","../../../../assets/work.svg","../../../../assets/work2.svg"];
  text=["Fully trained workers","Friendly environment","100% secure contracts"];
  number=0;
  logo=this.images[0];
  info=this.text[0];

  loginForm: FormGroup=this.builder.group({
    email: ['',[Validators.email,Validators.required]],
    password: ['',Validators.required],
  })

  get email() { return this.loginForm.controls['email'];}
  get password() { return this.loginForm.controls['password'];}

  constructor(public builder:FormBuilder, public service:AuthService, public router: Router, public snack: MatSnackBar) {}

  login(){
    const user= {
      email: this.email.value,
      password: this.password.value
    }
    this.service.login(user).subscribe({
      next: (data:any) => console.log(data.body),
      error: () => {
        document.getElementById('errorLogin')!.style.display='block'
        document.getElementById('errorLogin')!.innerHTML="Incorrect email or password";
      },
      complete: () => this.router.navigate(['/home']).then(),
    })
  } 

  snackBar(){
    this.snack.open('Incorrect email or password','Close')
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
