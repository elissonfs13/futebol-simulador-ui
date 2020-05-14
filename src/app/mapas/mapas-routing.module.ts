import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MapasColocacoesComponent } from './colocacoes';
import { MapasCampeoesComponent } from './campeoes';
import { MapasParticipantesComponent } from './participantes';

export const MapasRoutes: Routes = [
	{ 
		path: 'mapas',
		children: [
		  {
			path: 'colocacoes', 
			component: MapasColocacoesComponent
		  },
		  {
			path: 'participantes', 
			component: MapasParticipantesComponent
		  },
		  {
			path: 'campeoes', 
			component: MapasCampeoesComponent 
		  }
		]
	}
];

@NgModule({
  imports: [
    RouterModule.forChild(MapasRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MapasRoutingModule {
}