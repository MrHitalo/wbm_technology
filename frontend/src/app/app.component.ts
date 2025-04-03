import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PainelComponent } from './pages/painel/painel.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,PainelComponent,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
