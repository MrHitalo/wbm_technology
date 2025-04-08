import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsferaComponent } from './esfera.component';

describe('EsferaComponent', () => {
  let component: EsferaComponent;
  let fixture: ComponentFixture<EsferaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EsferaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsferaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
