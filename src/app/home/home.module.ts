import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './component';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class HomeModule { }
