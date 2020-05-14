import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NotifierService } from "angular-notifier";

import { GraficoService, SelecaoService, Selecao } from '../../shared';

declare var google: any;

declare class DataLinha {
	identificador: string;
	valores: number[];
}

@Component({
  	selector: 'app-graficos-colocacoes',
  	templateUrl: './graficos-colocacoes.component.html',
  	styleUrls: ['./graficos-colocacoes.component.css']
})
export class GraficosColocacoesComponent implements OnInit {

	private readonly notifier: NotifierService;
  	dadosSel: DataLinha[];
  	selCadastradas: Selecao[];
  	selecoesSelecionadas: Selecao[];

  	constructor(private graficoService: GraficoService,
  				private selecaoService: SelecaoService, 
  				private notifierService: NotifierService) {
  		this.notifier = notifierService;
  	}

  	ngOnInit(): void {
  		this.dadosSel = [];
  		this.selecoesSelecionadas = [];
  		this.listarSelecoes();
  	}

  	listarSelecoes(): void {
	  	this.selecaoService.listarSelecoes().subscribe(
  			data => {
        	this.selCadastradas = data as Selecao[]; 
    	  },
  			err => { 
      		this.alertErro(err.error.mensagens); 
      	}
  		);
  	}

  	adicionaNoGrafico(selecao: Selecao): void {
  		this.selecoesSelecionadas.push(selecao);

		  this.selCadastradas.forEach((dadoSel, index) => {
  			if (dadoSel === selecao) {
  				this.selCadastradas.splice(index,1);
  			}
  		})

		  this.obterPosicoesSelecao(selecao.id.toString());
  	}

  	removeDoGrafico(selecao: Selecao): void {
  		if (this.selecoesSelecionadas.length == 1) {
  			this.alertErro("Pelo menos uma seleção deve estar selecionada para exibição no gráfico"); 
  		} else {
			this.selCadastradas.push(selecao);

			this.selecoesSelecionadas.forEach((dadoSel, index) => {
	  			if (dadoSel === selecao) {
	  				this.selecoesSelecionadas.splice(index,1);
	  			}
	  		})

			this.dadosSel.forEach((dadoSel, index) => {
	  			if (dadoSel.identificador === selecao.nome) {
	  				this.dadosSel.splice(index,1);
	  			}
	  		})

			this.initChart();
		}
	};

  	obterPosicoesSelecao(idSelecao: string): void {
  		this.graficoService.listarPosicoesSelecoes(idSelecao).subscribe(
	  		data => {
	  			this.dadosSel.push(data);
          this.initChart();
	  		}, 
	  		err => { 
	            this.alertErro("Erro ao obter estatísticas."); 
	        }
	    );
  	}

  	removeDadosSel(selecao: Selecao): void {
  		this.dadosSel.forEach((dadoSel, index) => {
  			if (dadoSel.identificador == selecao.nome) {
  				this.dadosSel.splice(index,1);
  			}
  		})
  	}

  	initChart(): void {
	    if(typeof(google) !== 'undefined') {
	      	google.charts.load('current', {'packages':['corechart', 'line']});
	      	setTimeout(() => {
	      		google.charts.setOnLoadCallback(this.exibirLineChart());
	      	}, 1000);
	    }
  	}

  	exibirLineChart(): void {
	  	const el = document.getElementById('line_chart');
	    const chart = new google.visualization.LineChart(el);
	    const titulo = 'Evolução de Colocações';
	    
	    chart.draw(this.obterDataTable(this.dadosSel), this.obterOpcoes(titulo));
	}

  	obterDataTable(dadosRetornados: DataLinha[]): any {
  		console.log(dadosRetornados);
      	const data = new google.visualization.DataTable();
      	let row: number[];
	    data.addColumn('number', 'X');

	    dadosRetornados.forEach(dadoRetornado => 
	    	data.addColumn('number', dadoRetornado.identificador));

	    for (var i = 0; i < dadosRetornados[0].valores.length; i++) {
	    	row = [];
	    	row.push(i+1);
	    	dadosRetornados.forEach(dadoRetornado => row.push(dadoRetornado.valores[i]));
	    	data.addRow(row);
	    }

    	return data;
  	}

  	obterOpcoes(titulo: string): any {
	  	return {
	    	'title': titulo,
        'width': 1040,
        'height': 420,
        'hAxis': { 
    			'title': 'Edição do Campeonato'
    		},
    		'vAxis': { 
    			'title': 'Fase / Colocação',
    			'ticks': [
    				{ v: 0, f: 'Não Participou'}, 
    				{ v: 1, f: 'Fase de Grupos'},
    				{ v: 2, f: 'Oitavas de Finais'},
    				{ v: 3, f: 'Quartas de Finais'},
    				{ v: 4, f: 'Quarto Lugar'},
    				{ v: 5, f: 'Terceiro Lugar'},
    				{ v: 6, f: 'Vice Campeão'},
    				{ v: 7, f: 'Campeão'}
    			]
    		}
	    };
  	}

  	alertErro(msg: string): void {
      	this.notifier.notify("error", msg);
    }

}
