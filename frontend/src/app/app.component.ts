import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PainelControleComponent } from './painel-controle/painel-controle.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,PainelControleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
