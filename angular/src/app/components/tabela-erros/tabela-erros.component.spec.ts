import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaErrosComponent } from './tabela-erros.component';

describe('TabelaErrosComponent', () => {
  let component: TabelaErrosComponent;
  let fixture: ComponentFixture<TabelaErrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabelaErrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelaErrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
