import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private _Router = inject(Router);
  user: any = null;
  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      console.log(this.user);
    }
  }

}
