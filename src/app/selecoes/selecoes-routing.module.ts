import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListarSelecoesComponent } from './listar';
import { CadastrarSelecoesComponent } from './cadastrar';

export const SelecoesRoutes: Routes = [
	{ 
		path: 'selecoes',
		children: [
		  {
			path: 'listar', 
			component: ListarSelecoesComponent
		  },
		  {
			path: 'cadastrar', 
			component: CadastrarSelecoesComponent 
		  },
		  {
			path: ':id', 
			component: CadastrarSelecoesComponent 
		  }
		]
	}
];

@NgModule({
  imports: [
    RouterModule.forChild(SelecoesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SelecoesRoutingModule {
}