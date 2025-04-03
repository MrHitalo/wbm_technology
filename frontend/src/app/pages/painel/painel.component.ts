import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CardEquipamentoComponent } from '../../components/card-equipamento/card-equipamento.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Dispositivo {
  key: string;
  value: { [key: string]: number };
}

@Component({
  selector: 'app-painel',
  imports: [MatButtonModule, CardEquipamentoComponent, MatGridListModule, CommonModule], // Importando corretamente o módulo do botão
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css'] // Nome correto da propriedade
})
export class PainelComponent { 

  dadosModbus: { [key: string]: { [key: string]: number } } = {};
  dispositivosFormatados: Dispositivo[] = [];
  carregando = true;
  erroCarregamento = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.carregarDados();
  }

  private carregarDados() {
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
        this.erroCarregamento = 'Falha ao conectar com o servidor Modbus';
        this.carregando = false;
        console.error('Erro:', err);
      }
    });
  }

  formatarValor(valor: any): string {
    const num = Number(valor);
    return isNaN(num) ? 'N/A' : num.toString();
  }
  
}
