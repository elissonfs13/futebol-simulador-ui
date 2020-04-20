import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms'; 
import { NotifierService } from "angular-notifier";

import { 
	CampeonatoService, 
	Campeonato,
	Grupo,
	Jogo
} from '../../../shared';

@Component({
  selector: 'app-campeonato',
  templateUrl: './copa.component.html',
  styleUrls: ['./copa.component.css']
})
export class CopaComponent implements OnInit {

	campeonato: Campeonato;
	grupoA: Grupo;
	grupoB: Grupo;
	grupoC: Grupo;
	grupoD: Grupo;
	grupoE: Grupo;
	grupoF: Grupo;
	grupoG: Grupo;
	grupoH: Grupo;
	oitavas: Jogo[];
	quartas: Jogo[];
	semis: Jogo[];
	finalCampeonato: Jogo;
	terceiroQuarto: Jogo;
  private readonly notifier: NotifierService;
	
	idCampeonato: number;

  	@ViewChild('formCampeonato', { static: true }) formCampeonato: NgForm;

  	constructor(private campeonatoService: CampeonatoService,
  		          private route: ActivatedRoute,
                private notifierService: NotifierService) { 
      this.notifier = notifierService;
    }

  	ngOnInit(): void {
  		this.idCampeonato = +this.route.snapshot.params['id'];
  		this.getCampeonato(this.idCampeonato);
  	}

  	getCampeonato(idCampeonato: number): void {
  		this.campeonatoService.getCampeonato(idCampeonato).subscribe(
			data => { 
				this.populaCampeonato(data);
			},
			err => { 
          this.alertErro("Erro ao carregar campeonato"); 
        }
		);
  	}

  	populaCampeonato(campeonatoResponse: Campeonato): void {
  		this.campeonato = campeonatoResponse;
  		this.grupoA = campeonatoResponse.grupos[0];
  		this.grupoB = campeonatoResponse.grupos[1];
  		this.grupoC = campeonatoResponse.grupos[2];
  		this.grupoD = campeonatoResponse.grupos[3];
  		this.grupoE = campeonatoResponse.grupos[4];
  		this.grupoF = campeonatoResponse.grupos[5];
  		this.grupoG = campeonatoResponse.grupos[6];
  		this.grupoH = campeonatoResponse.grupos[7];
  		this.oitavas = campeonatoResponse.oitavasFinal;
  		this.quartas = campeonatoResponse.quartasFinal;
  		this.semis = campeonatoResponse.semiFinal;
  		this.finalCampeonato = campeonatoResponse.finalCampeonato;
  		this.terceiroQuarto = campeonatoResponse.terceiroQuarto;
  	}

    alertSuccesso(msg: string): void {
      this.notifier.notify("success", msg);
    }

    alertErro(msg: string): void {
      this.notifier.notify("error", msg);
    }

}
