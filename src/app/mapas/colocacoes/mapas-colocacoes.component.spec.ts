import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapasColocacoesComponent } from './mapas-colocacoes.component';

describe('MapasColocacoesComponent', () => {
  let component: MapasColocacoesComponent;
  let fixture: ComponentFixture<MapasColocacoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapasColocacoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapasColocacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
