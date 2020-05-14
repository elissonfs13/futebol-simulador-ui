import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GraficosCampeoesComponent } from './campeoes';
import { GraficosColocacoesComponent } from './colocacoes';
import { GraficosParticipantesComponent } from './participantes';

export const GraficosRoutes: Routes = [
	{ 
		path: 'graficos',
		children: [
		  {
			path: 'campeoes', 
			component: GraficosCampeoesComponent
		  },
		  {
			path: 'participantes', 
			component: GraficosParticipantesComponent
		  },
		  {
			path: 'colocacoes', 
			component: GraficosColocacoesComponent 
		  }
		]
	}
];

@NgModule({
  imports: [
    RouterModule.forChild(GraficosRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class GraficosRoutingModule {
}