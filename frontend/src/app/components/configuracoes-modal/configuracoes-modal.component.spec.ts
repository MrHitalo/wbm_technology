import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracoesModalComponent } from './configuracoes-modal.component';

describe('ConfiguracoesModalComponent', () => {
  let component: ConfiguracoesModalComponent;
  let fixture: ComponentFixture<ConfiguracoesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfiguracoesModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiguracoesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
