import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NotifierService } from "angular-notifier";

import { GraficoService } from '../../shared';

declare var google: any;

declare class DataPizza {
	identificador: string;
	valor: number;
}

@Component({
  	selector: 'app-graficos-participantes',
  	templateUrl: './graficos-participantes.component.html',
  	styleUrls: ['./graficos-participantes.component.css']
})
export class GraficosParticipantesComponent implements OnInit {

	private readonly notifier: NotifierService;
  	private dadosSel: DataPizza[];

  	constructor(private graficoService: GraficoService, private notifierService: NotifierService) {
  		this.notifier = notifierService;
  	}

  	ngOnInit(): void {
	  	this.obterSelecoesParticipantes();
	  	
  	}

  	obterSelecoesParticipantes(): void {
  		this.graficoService.listarSelecoesParticipantes().subscribe(
	  		data => {
	  			this.dadosSel = data;
	  			this.init();
	  		}, 
	  		err => { 
	            this.alertErro("Erro ao obter estatísticas."); 
	        });
  	}

  	init(): void {
	    if(typeof(google) !== 'undefined') {
	      	google.charts.load('current', {'packages':['corechart']});
	      	setTimeout(() => {
	      		google.charts.setOnLoadCallback(this.exibirGraficos());
	      	}, 1000);
	    }
  	}

  	exibirGraficos(): void {
  	   	this.exibirColumnChartSel();
  	}

  	exibirColumnChartSel(): void {
	  	const el = document.getElementById('bar_chart_sel');
	    const chart = new google.visualization.ColumnChart(el);
	    const titulo = 'Seleções Participantes';

	    chart.draw(this.obterDataTable(this.dadosSel), this.obterOpcoes(titulo));
  	}

  	obterDataTable(dadosRetornados: DataPizza[]): any {
      	const data = new google.visualization.DataTable();
	    data.addColumn('string', 'identificador');
	    data.addColumn('number', 'valor');

	    dadosRetornados.forEach(d => data.addRow([d.identificador, d.valor]));
    	return data;
  	}

  	obterOpcoes(titulo: string): any {
	  	return {
	    	'title': titulo,
	    	'is3D': true,
	        'width': 1080,
	        'height': 640,
	        'legend': {	'position': 'none' },
    		'hAxis': { 
    			'textStyle': { 'fontSize': 12 },
    			'slantedText': true, 
        		'slantedTextAngle': 90
    		},
    		'vAxis': {'format': '0'},
    		'bar': { 'groupWidth': "80%" },
    		'chartArea': {'width': '90%', 'height': '75%', 'top':50}

	    };
  	}

  	alertErro(msg: string): void {
      this.notifier.notify("error", msg);
    }

}
