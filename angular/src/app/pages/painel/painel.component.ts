import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CardEquipamentoComponent } from '../../components/card-equipamento/card-equipamento.component';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card'
import { FormsModule } from '@angular/forms';

interface Dispositivo {
  key: string;
  value: { [key: string]: number };
}

@Component({
  selector: 'app-painel',
  imports: [
    MatButtonModule,
    CardEquipamentoComponent , 
    MatGridListModule, 
    CommonModule, 
    MatIconModule, 
    MatProgressSpinnerModule,
    MatCardModule,
    RouterModule,
    CardEquipamentoComponent,
    FormsModule 
  ],
  templateUrl: './painel.component.html', 
  styleUrls: ['./painel.component.css'],
})
export class PainelComponent implements OnInit { 

  dadosModbus: { [key: string]: { [key: string]: number } } = {};
  dispositivosFormatados: Dispositivo[] = [];
  carregando = true;
  erroCarregamento = '';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.carregarDados();
  }

  public carregarDados() {
    this.http.get<{ data: any }>('http://localhost:3000/moduloMestre/todos').subscribe({
      next: (res) => {
        this.dadosModbus = res.data;  
        this.dispositivosFormatados = Object.entries(res.data).map(([key, value]) => ({
          key,
          value: value as { [key: string]: number }
        }));
        console.log('Dispositivos formatados:', this.dispositivosFormatados);
        this.carregando = false;
      },
      error: (err) => {
        this.erroCarregamento = 'Falha ao conectar com o servidor Modbus. Tente recarregar a página.';
        this.carregando = false;
        console.error('Erro detalhado:', err);
      }
    });
    }

  verDetalhesEquipamento(idEquipamento: string) {
    console.log('Método chamado com ID do equipamento:', idEquipamento);
    switch (idEquipamento) {
      case 'esfera':
        this.router.navigate(['/equipamento/esfera']).catch(err => {
          console.error('Erro ao navegar para o equipamento esfera:', err);
        });
        break;
      case 'gaveta':
        this.router.navigate(['/equipamento/gaveta']).catch(err => {
          console.error('Erro ao navegar para o equipamento gaveta:', err);
        });
        break;
      case 'ar':
        this.router.navigate(['/equipamento/ar']).catch(err => {
          console.error('Erro ao navegar para o equipamento ar:', err);
        });
        break;
      default:
        console.error('Tipo de equipamento desconhecido:', idEquipamento);
    }
  }

  formatarValor(valor: any): string {
    const num = Number(valor);
    if (isNaN(num)) return 'N/A';
    return Number.isInteger(num) ? num.toString() : num.toFixed(2);

  }

}
