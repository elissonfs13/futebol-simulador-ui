import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapasParticipantesComponent } from './mapas-participantes.component';

describe('MapasParticipantesComponent', () => {
  let component: MapasParticipantesComponent;
  let fixture: ComponentFixture<MapasParticipantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapasParticipantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapasParticipantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
