import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficosCampeoesComponent } from './graficos-campeoes.component';

describe('GraficosCampeonatosComponent', () => {
  let component: GraficosCampeoesComponent;
  let fixture: ComponentFixture<GraficosCampeoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficosCampeoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficosCampeoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
