import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CampeonatosComponent,
		 ListarCampeonatosComponent, 
 		 CopaComponent,
 		 SelecionaSelecaoComponent } from './components';

export const CampeonatoRoutes: Routes = [
	{ 
		path: 'campeonato',
		component: CampeonatosComponent,
		children: [
		  {
			path: 'listar', 
			component: ListarCampeonatosComponent
		  },
		  {
			path: 'seleciona', 
			component: SelecionaSelecaoComponent 
		  },
		  {
			path: ':id', 
			component: CopaComponent 
		  }
		]
	}
];

@NgModule({
  imports: [
    RouterModule.forChild(CampeonatoRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CampeonatoRoutingModule {
}
