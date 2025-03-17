import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../core/interfaces/User';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private _UserService: UserService) { }
  true: boolean = true;
  false: boolean = false;
  registerForm: FormGroup = new FormGroup(
    {
      fristName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10),
      ]),
      confirmPassword: new FormControl(''),
      gender: new FormControl(true, [Validators.required]),
      age: new FormControl(0, [Validators.required]),
    },
  );
  registerSubmit() {
    if (this.registerForm.valid) {
      const user = this.registerForm.value;
      if (user.gender === "true") {
        user.gender = true;
      } else {
        user.gender = false;
      }
      console.log(user);
      this._UserService.userRegister(user).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.log(err);

        }
      })
    }

  }
}
