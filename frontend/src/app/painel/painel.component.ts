import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { CardEquipamentoComponent } from '../components/card-equipamento/card-equipamento.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

interface Dispositivo {
  key: string;
  value: { [key: string]: number };
}

@Component({
  selector: 'app-painel',
  imports: [MatButtonModule, CardEquipamentoComponent, MatGridListModule, CommonModule, MatIconModule,  MatProgressSpinnerModule],
  templateUrl: './painel.component.html', 
  styleUrls: ['./painel.component.css'] 

})
export class PainelComponent implements OnInit{ 

  dadosModbus: { [key: string]: { [key: string]: number } } = {};
  dispositivosFormatados: Dispositivo[] = [];
  carregando = true;
  erroCarregamento = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.carregarDados();
  }

  public carregarDados() {
    this.http.get<{ data: any }>('http://localhost:3000/api/modbus/data').subscribe({
      next: (res) => {
        this.dadosModbus = res.data;
        this.dispositivosFormatados = Object.entries(res.data).map(([key, value]) => ({
          key,
          value: value as { [key: string]: number }
        }));
        this.carregando = false;
      },
      error: (err) => {
        this.erroCarregamento = 'Falha ao conectar com o servidor Modbus. Tente recarregar a página.';
        this.carregando = false;
        console.error('Erro detalhado:', err);
      }
    });
  }

  formatarValor(valor: any): string {
    const num = Number(valor);
    return isNaN(num) ? 'N/A' : num.toString();
  }
  
}
