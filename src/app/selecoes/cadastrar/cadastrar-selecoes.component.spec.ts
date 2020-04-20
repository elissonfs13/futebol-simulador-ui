import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarSelecoesComponent } from './cadastrar-selecoes.component';

describe('CadastrarSelecoesComponent', () => {
  let component: CadastrarSelecoesComponent;
  let fixture: ComponentFixture<CadastrarSelecoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarSelecoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarSelecoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
