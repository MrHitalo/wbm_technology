import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'; 

@Component({
  selector: 'app-card-equipamento',
  imports: [MatButtonModule,MatCardModule],
  templateUrl: './card-equipamento.component.html',
  styleUrl: './card-equipamento.component.css'
})
export class CardEquipamentoComponent {
  @Input() titulo: string = 'Equipamento';
}
