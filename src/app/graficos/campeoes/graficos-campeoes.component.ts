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
  	selector: 'app-graficos-campeoes',
  	templateUrl: './graficos-campeoes.component.html',
  	styleUrls: ['./graficos-campeoes.component.css']
})
export class GraficosCampeoesComponent implements OnInit {

	private readonly notifier: NotifierService;
  	private dadosConf: DataPizza[];
  	private dadosSel: DataPizza[];

  	constructor(private graficoService: GraficoService, private notifierService: NotifierService) {
  		this.notifier = notifierService;
  	}

  	ngOnInit(): void {
	  	this.obterConfederacoesCampeas();
	  	this.obterSelecoesCampeas();
	  	this.init();
  	}

  	obterConfederacoesCampeas(): void {
  		this.graficoService.listarConfederacoesCampeas().subscribe(
	  		data => {
	  			this.dadosConf = data;
	  		}, 
	  		err => { 
	            this.alertErro("Erro ao obter estatísticas."); 
	        });
  	}

  	obterSelecoesCampeas(): void {
  		this.graficoService.listarSelecoesCampeas().subscribe(
	  		data => {
	  			this.dadosSel = data;
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
  	   	this.exibirPieChartConf();
  	   	this.exibirPieChartSel();
  	}

  	exibirPieChartConf(): void {
	  	const el = document.getElementById('pie_chart_conf');
	    const chart = new google.visualization.PieChart(el);
	    const titulo = 'Confederações Campeãs';

	    chart.draw(this.obterDataTable(this.dadosConf), this.obterOpcoes(titulo));
  	}

  	exibirPieChartSel(): void {
	  	const el = document.getElementById('pie_chart_sel');
	    const chart = new google.visualization.PieChart(el);
	    const titulo = 'Seleções Campeãs';

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
	        'width': 540,
	        'height': 420,
	        'chartArea': {'width': '95%', 'height': '90%'}
	    };
  	}

  	alertErro(msg: string): void {
      this.notifier.notify("error", msg);
    }

}
