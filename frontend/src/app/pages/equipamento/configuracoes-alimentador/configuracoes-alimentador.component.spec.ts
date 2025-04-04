import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracoesAlimentadorComponent } from './configuracoes-alimentador.component';

describe('ConfiguracoesAlimentadorComponent', () => {
  let component: ConfiguracoesAlimentadorComponent;
  let fixture: ComponentFixture<ConfiguracoesAlimentadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfiguracoesAlimentadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiguracoesAlimentadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
