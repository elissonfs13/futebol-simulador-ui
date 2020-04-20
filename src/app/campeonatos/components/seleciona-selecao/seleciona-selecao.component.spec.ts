import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionaSelecaoComponent } from './seleciona-selecao.component';

describe('SelecionaSelecaoComponent', () => {
  let component: SelecionaSelecaoComponent;
  let fixture: ComponentFixture<SelecionaSelecaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelecionaSelecaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecionaSelecaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
