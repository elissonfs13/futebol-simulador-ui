import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficosParticipantesComponent } from './graficos-participantes.component';

describe('GraficosParticipantesComponent', () => {
  let component: GraficosParticipantesComponent;
  let fixture: ComponentFixture<GraficosParticipantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficosParticipantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficosParticipantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
