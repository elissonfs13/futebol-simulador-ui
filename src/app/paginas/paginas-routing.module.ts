import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AutorComponent } from './autor/autor.component';
import { RegrasComponent } from './regras/regras.component';
import { TecnologiasComponent } from './tecnologias/tecnologias.component';

export const PaginasRoutes: Routes = [
	{ path: 'autor', component: AutorComponent	},
	{ path: 'regras', component: RegrasComponent	},
	{ path: 'tecnologias', component: TecnologiasComponent	},
];

@NgModule({
  imports: [
    RouterModule.forChild(PaginasRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PaginasRoutingModule {
}
