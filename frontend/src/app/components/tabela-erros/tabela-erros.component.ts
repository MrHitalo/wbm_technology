import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tabela-erros',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './tabela-erros.component.html',
  styleUrls: ['./tabela-erros.component.css']
})
export class TabelaErrosComponent implements AfterContentInit {
  faEye = faEye;
  erros: { titulo: string, descricao: string }[] = [];

  @ContentChildren('erroItem') items!: QueryList<any>;

  ngAfterContentInit() {
    this.items.forEach(item => {
      const titulo = item.nativeElement.querySelector('.erro-titulo').textContent;
      const descricao = item.nativeElement.querySelector('.erro-descricao').textContent;
      this.erros.push({ titulo, descricao });
    });
  }
}