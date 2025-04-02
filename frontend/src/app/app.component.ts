import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';import { PainelComponent } from './painel/painel.component';
import { HeaderComponent } from './components/header/header.component';
import { TodosDispositivosComponent } from './painel/todos-dispositivos/todos-dispositivos.component';
;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,PainelComponent,HeaderComponent, TodosDispositivosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
