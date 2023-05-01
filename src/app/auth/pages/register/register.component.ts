import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  hide = true;
  userId=0;
  registerForm: FormGroup = this.builder.group({
    name: ['', [Validators.required, Validators.maxLength(10)]],
    lastName: ['', [Validators.required, Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [
      Validators.required,
      Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/)]
    ],
    confirmPassword: ['', [Validators.required]],
    number: ['', [Validators.required,
      Validators.minLength(7),
      Validators.maxLength(7),
      Validators.pattern(/^9/)
    ]],
    typeUser: ['', Validators.required],
    typeService: ['', Validators.required],
  }, {validator: this.confirmedValidator('password', 'confirmPassword')});

  get name() {
    return this.registerForm.controls['name'];
  }

  get lastName() {
    return this.registerForm.controls['lastName'];
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }

  get number() {
    return this.registerForm.controls['number'];
  }

  get typeUser(){
    return this.registerForm.controls['typeUser'];
  }

  get typeService(){
    return this.registerForm.controls['typeService'];
  }

  constructor(public builder: FormBuilder, public service:AuthService, public router:Router) {
  }

  register(){
    const user={
      email: this.email.value,
      password: this.password.value,
      roles: [
        this.typeUser.value
      ]
    };
    const employee={
      name: this.name.value+" "+this.lastName.value,
      age: 0,
      phone: this.number.value.toString(),
      altphone: "-",
      urlToImage: "-",
      description: "-"
    }
    const client={
      name: this.name.value+" "+this.lastName.value,
      age: 0,
      phone: this.number.value.toString(),
      altphone: "-",
      urlToImage: "-",
      address: "-",
      description: "-"
    }
    console.log(client)
    this.service.register(user).subscribe({
        next: (v: any) => this.userId=v.body.id,
        error: (e) => console.error(e),
        complete: () => {
          if (this.typeUser.value=='ROLE_EMPLOYEE') this.service.createEmployee(employee,this.userId,this.typeService.value).subscribe(a=>{console.log(a)});
          else this.service.createClient(client,this.userId).subscribe(a=>{console.log(a)});
          this.router.navigate(['/home']).then();
        }
      })
  }

  confirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors?.['confirmedValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({confirmedValidator: true});
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
