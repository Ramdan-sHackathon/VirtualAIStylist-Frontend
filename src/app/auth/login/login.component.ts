import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../core/interfaces/User';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private _UserService: UserService, private _Router: Router) { }
  user: User = {} as User;
  loginForm: FormGroup = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10),
      ]),
    },
  );
  loginSubmit() {
    if (this.loginForm.valid) {
      this.user = this.loginForm.value;
      this._UserService.userLogin(this.user.email, this.user.password).subscribe({
        next: (res) => {
          console.log(res.data.email);
          console.log(res.statusCode);
          console.log(res);
          localStorage.setItem('Token', res.data.email);
          localStorage.setItem('user', JSON.stringify(res.data));
          if (res.statusCode == 200) {
            this._Router.navigateByUrl('/home');
          }
        },
        error: (err) => {
          console.log(err);
        }
      })
    }

  }
}
