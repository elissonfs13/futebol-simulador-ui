import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelecoesRoutes } from './selecoes';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
