import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms'; 
import { NotifierService } from "angular-notifier";

import { 
	CampeonatoService, 
	SelecaoService,
	Campeonato,
	Selecao 
} from '../../../shared';

@Component({
  selector: 'app-seleciona-selecao',
  templateUrl: './seleciona-selecao.component.html',
  styleUrls: ['./seleciona-selecao.component.css']
})
export class SelecionaSelecaoComponent implements OnInit {

	selecoes: Selecao[];
	selecoesSelecionadas: Selecao[];
	campeonatoGerado: boolean;
	private readonly notifier: NotifierService;

  	constructor(private campeonatoService: CampeonatoService,
  				private selecaoService: SelecaoService,
  				private router: Router,
				private notifierService: NotifierService) { 
      this.notifier = notifierService;
    }

 	ngOnInit(): void {
  		this.campeonatoGerado = false;
  		this.selecoesSelecionadas = [];
  		this.listarSelecoes();
  	}

  	listarSelecoes(): void {
	  	this.selecaoService.listarSelecoes().subscribe(
			data => { 
				this.selecoes = data 
			},
			err => { 
				this.alertErro("Erro ao obter seleções.");
			}
		);
	}

	gerarCampeonato(): void {
  		this.campeonatoService.gerarCampeonato(this.selecoesSelecionadas).subscribe(
			data => { 
				this.router.navigate(["/campeonato/" + data.id]);
			},
			err => { 
				this.alertErro("Erro ao obter campeonato."); 
			}
		);
  	}

  	selecionaAleatorio(): void {
  		var selEscolhida, numGerado;
  		for (var i = this.selecoesSelecionadas.length; i < 32; i++){
			numGerado = this.getRandomIntInclusive(0,this.selecoes.length - 1);
			selEscolhida = this.selecoes[numGerado];
			if (selEscolhida != undefined){
				this.seleciona(selEscolhida);
			}
		}
	}

	getRandomIntInclusive(min, max): number {
		min = Math.ceil(min);
	    max = Math.floor(max);
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	seleciona(selecaoEscolhida: Selecao): void {
		if (!this.campeonatoCompleto()) {
			this.selecoesSelecionadas.push(selecaoEscolhida);
			var index = this.selecoes.indexOf(selecaoEscolhida);
			if (index > -1) {
			    this.selecoes.splice(index, 1);
			}
		}
	};

	deseleciona(selecaoEscolhida: Selecao): void {
		this.selecoes.push(selecaoEscolhida);
		var index = this.selecoesSelecionadas.indexOf(selecaoEscolhida);
		if (index > -1) {
		    this.selecoesSelecionadas.splice(index, 1);
		}
	};

	campeonatoCompleto(): boolean {
		return this.selecoesSelecionadas.length == 32 ? true : false;
	};

	alertSuccesso(msg: string): void {
      this.notifier.notify("success", msg);
    }

    alertErro(msg: string): void {
      this.notifier.notify("error", msg);
    }

}
