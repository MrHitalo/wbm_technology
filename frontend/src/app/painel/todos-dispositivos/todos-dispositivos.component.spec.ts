import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosDispositivosComponent } from './todos-dispositivos.component';

describe('TodosDispositivosComponent', () => {
  let component: TodosDispositivosComponent;
  let fixture: ComponentFixture<TodosDispositivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodosDispositivosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodosDispositivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
