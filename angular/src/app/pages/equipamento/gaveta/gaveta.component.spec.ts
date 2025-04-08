import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GavetaComponent } from './gaveta.component';

describe('GavetaComponent', () => {
  let component: GavetaComponent;
  let fixture: ComponentFixture<GavetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GavetaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GavetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
