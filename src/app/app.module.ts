import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NotifierModule, NotifierOptions } from "angular-notifier";

import { AppComponent } from './app.component';
import { HomeModule, HomeRoutingModule } from './home';
import { SelecoesModule, SelecoesRoutingModule } from './selecoes';
import { CampeonatoModule, CampeonatoRoutingModule } from './campeonatos';
import { GraficosModule, GraficosRoutingModule } from './graficos';
import { MapasModule, MapasRoutingModule } from './mapas';
import { PaginasModule, PaginasRoutingModule } from './paginas';
import { SelecaoService, CampeonatoService, GraficoService } from './shared';
import { AppRoutingModule } from './app-routing.module';

const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: { position: 'right', distance: 12 },
    vertical: { position: 'top', distance: 12, gap: 10 }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: false,
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: { preset: 'slide', speed: 300, easing: 'ease' },
    hide: { preset: 'fade', speed: 300, easing: 'ease', offset: 50 },
    shift: { speed: 300, easing: 'ease' },
    overlap: 150
  }
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HomeModule,
    FormsModule,
    HttpClientModule,
    SelecoesModule,
    CampeonatoModule,
    GraficosModule,
    MapasModule,
    PaginasModule,
    NotifierModule.withConfig( customNotifierOptions ),

	  
    SelecoesRoutingModule,
    CampeonatoRoutingModule,
    GraficosRoutingModule,
    MapasRoutingModule,
    PaginasRoutingModule,
    HomeRoutingModule,
    AppRoutingModule
  ],
  providers: [
    SelecaoService,
    CampeonatoService,
    GraficoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
