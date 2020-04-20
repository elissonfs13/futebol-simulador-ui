import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { StringFilterPipe } from './string-filter.pipe';
import { Ng2OrderModule } from 'ng2-order-pipe';

import { ListarSelecoesComponent } from './listar';
import { CadastrarSelecoesComponent } from './cadastrar';

@NgModule({
  declarations: [ListarSelecoesComponent, CadastrarSelecoesComponent, StringFilterPipe],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgxPaginationModule,
    Ng2OrderModule
  ]
})
export class SelecoesModule { }
