import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraficosCampeoesComponent } from './campeoes';
import { GraficosColocacoesComponent } from './colocacoes';
import { GraficosParticipantesComponent } from './participantes';



@NgModule({
  declarations: [
  	GraficosCampeoesComponent, 
  	GraficosColocacoesComponent, 
  	GraficosParticipantesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GraficosModule { }
