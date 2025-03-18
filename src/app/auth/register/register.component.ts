import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../core/interfaces/User';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, FormsModule, CommonModule, Toast],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [MessageService]
})
export class RegisterComponent {
  constructor(private _UserService: UserService, private _Router: Router, private _MessageService: MessageService) { }
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
    this.confirmPassword
  );
  confirmPassword(g: AbstractControl) {
    if (g.get('password')?.value === g.get('confirmPassword')?.value) {
      return null;
    } else {
      return {
        mismatch: true,
      };
    }
  }
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
        next: (res) => {
          console.log(res);
          this._MessageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Registeration Done ',
          })
          setTimeout(() => {
            if (res.statusCode == 200) {
              this._Router.navigateByUrl('/login');
            }
          }, 2000)
        },
        error: (err) => {
          this._MessageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Check Your Data ',
          })
        }
      })
    }
  }
}
