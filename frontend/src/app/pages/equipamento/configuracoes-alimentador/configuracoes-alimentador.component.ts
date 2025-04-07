import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-configuracoes-alimentador',
  templateUrl: './configuracoes-alimentador.component.html',
  styleUrls: ['./configuracoes-alimentador.component.css']
})
export class ConfiguracoesAlimentadorComponent implements OnInit {
  equipamentoId!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.equipamentoId = this.route.snapshot.paramMap.get('id') || '';
    console.log('ID do equipamento:', this.equipamentoId);
  }
}
