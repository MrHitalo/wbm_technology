import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';import { PainelComponent } from './painel/painel.component';
;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,PainelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
