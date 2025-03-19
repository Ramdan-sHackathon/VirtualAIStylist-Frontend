import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TryOnArComponent } from './try-on-ar/try-on-ar.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Virtual-Ai-Stylist';
}
