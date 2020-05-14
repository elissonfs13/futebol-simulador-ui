import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapasCampeoesComponent } from './mapas-campeoes.component';

describe('MapasSelecoesComponent', () => {
  let component: MapasCampeoesComponent;
  let fixture: ComponentFixture<MapasCampeoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapasCampeoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapasCampeoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
