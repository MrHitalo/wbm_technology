import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-painel',
  imports: [MatButtonModule], // Importando corretamente o módulo do botão
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css'] // Nome correto da propriedade
})
export class PainelComponent { }
