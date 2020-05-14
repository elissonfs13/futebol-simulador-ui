import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficosColocacoesComponent } from './graficos-colocacoes.component';

describe('GraficosColocacoesComponent', () => {
  let component: GraficosColocacoesComponent;
  let fixture: ComponentFixture<GraficosColocacoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficosColocacoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficosColocacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
