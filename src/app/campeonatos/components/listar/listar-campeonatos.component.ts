import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from "angular-notifier";

import { 
	CampeonatoService, 
	Campeonato,
	Grupo,
	Jogo,
	Selecao 
} from '../../../shared';

@Component({
  	selector: 'app-listar-campeonatos',
  	templateUrl: './listar-campeonatos.component.html',
  	styleUrls: ['./listar-campeonatos.component.css']
})
export class ListarCampeonatosComponent implements OnInit {

	  campeonatos: Campeonato[];
    itensPorPagina = [5,10,15,20,25,50,100];
    p: number = 1;
    qtdCampeonatos: number = 10;
    private readonly notifier: NotifierService;

  	constructor(private campeonatoService: CampeonatoService, 
                private router: Router,
                private notifierService: NotifierService) { 
      this.notifier = notifierService;
    }

  	ngOnInit(): void {
  		this.listarCampeonatos();
  	}

  	listarCampeonatos(): void {
  		this.campeonatoService.listarCampeonatos()
  			.subscribe(
  				data => { 
  					this.campeonatos = data;
  				},
  				err => { 
            this.alertErro("Erro ao obter campeonatos."); 
          }
  			);
  	}

  	verCampeonato(idCampeonato: number): void {
  		this.router.navigate(["/campeonato/" + idCampeonato]);
  	}

    alertSuccesso(msg: string): void {
      this.notifier.notify("success", msg);
    }

    alertErro(msg: string): void {
      this.notifier.notify("error", msg);
    }

}
