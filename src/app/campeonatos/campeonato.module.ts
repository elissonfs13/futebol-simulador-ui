import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

import { ListarCampeonatosComponent, 
		 CopaComponent, 
		 SelecionaSelecaoComponent, 
		 CampeonatosComponent } from './components';


@NgModule({
  declarations: [
  	ListarCampeonatosComponent, 
  	CampeonatosComponent, 
  	SelecionaSelecaoComponent, 
  	CopaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgxPaginationModule
  ]
})
export class CampeonatoModule { }
