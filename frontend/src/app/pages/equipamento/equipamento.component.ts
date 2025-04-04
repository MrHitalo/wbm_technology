import { Component } from '@angular/core';
import { ConfiguracoesAlimentadorComponent } from './configuracoes-alimentador/configuracoes-alimentador.component';
import { TabelaErrosComponent } from '../../components/tabela-erros/tabela-erros.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfiguracoesModalComponent } from '../../components/configuracoes-modal/configuracoes-modal.component';

@Component({
  selector: 'app-equipamento',
  standalone: true,
  imports: [
    ConfiguracoesAlimentadorComponent,
    TabelaErrosComponent,
    FooterComponent,
    MatButtonModule,
    ConfiguracoesModalComponent
  ],
  templateUrl: './equipamento.component.html',
  styleUrl: './equipamento.component.css'
})
export class EquipamentoComponent {
  constructor(private dialog: MatDialog) {}

  openConfigModal() {
    this.dialog.open(ConfiguracoesModalComponent, {
      width: '600px'
    });
  }
}