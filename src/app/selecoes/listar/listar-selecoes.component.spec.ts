import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSelecoesComponent } from './listar-selecoes.component';

describe('ListarSelecoesComponent', () => {
  let component: ListarSelecoesComponent;
  let fixture: ComponentFixture<ListarSelecoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarSelecoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarSelecoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
