import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapasCampeoesComponent } from './campeoes';
import { MapasColocacoesComponent } from './colocacoes';
import { MapasParticipantesComponent } from './participantes';



@NgModule({
  declarations: [
  	MapasCampeoesComponent, 
  	MapasColocacoesComponent, 
  	MapasParticipantesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MapasModule { }
