import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from '../components/header/header.component';
import { CardEquipamentoComponent } from '../components/card-equipamento/card-equipamento.component';
import { MatGridListModule } from '@angular/material/grid-list';


@Component({
  selector: 'app-painel',
  imports: [MatButtonModule, HeaderComponent, CardEquipamentoComponent, MatGridListModule], // Importando corretamente o módulo do botão
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css'] // Nome correto da propriedade
})
export class PainelComponent { }
