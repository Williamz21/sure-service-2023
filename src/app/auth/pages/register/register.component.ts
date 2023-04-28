import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {passwordValidation} from "../../shared/ts/passwordValidation";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  hide = true;

  registerForm: FormGroup = this.builder.group({
    name: ['', [Validators.required, Validators.maxLength(10)]],
    lastName: ['', [Validators.required, Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [
      Validators.required,
      Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/)]
    ],
    confirmPassword: ['', [Validators.required, passwordValidation]],
    number: ['', [Validators.required,
      Validators.minLength(7),
      Validators.maxLength(7),
      Validators.pattern(/^9/)
    ]],
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

  constructor(public builder: FormBuilder) {
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
