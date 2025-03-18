import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../core/interfaces/User';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, Toast],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService]
})
export class LoginComponent {
  constructor(private _UserService: UserService, private _Router: Router, private _MessageService: MessageService) { }
  user: User = {} as User;
  loginForm: FormGroup = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(18),
      ]),
    },
  );
  loginSubmit() {
    if (this.loginForm.valid) {
      this.user = this.loginForm.value;
      this._UserService.userLogin(this.user).subscribe({
        next: (res) => {
          localStorage.setItem('Token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data));
          this._MessageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Login Done Successfully!',
          })
          setTimeout(() => {
            if (res.statusCode == 200) {
              this._Router.navigateByUrl('/home');
            }
          }, 2000)
        },
        error: (err) => {

          this._MessageService.add({
            severity: 'error',
            summary: 'error',
            detail: 'Something Error , Check Your Data!',
          })
        }
      })
    }

  }
}
