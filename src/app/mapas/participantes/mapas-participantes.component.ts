import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { NotifierService } from "angular-notifier";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4lang_pt_BR from "@amcharts/amcharts4/lang/pt_BR";
import am4geodata_worldHigh from "@amcharts/amcharts4-geodata/worldHigh";
import am4geodata_ukCountriesHigh from "@amcharts/amcharts4-geodata/ukCountriesHigh";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4geodata_lang_PT from "@amcharts/amcharts4-geodata/lang/PT";

import { GraficoService } from '../../shared';

declare class DataMapa {
	identificador: string;
	valor: number;
}

@Component({
  selector: 'app-mapas-participantes',
  templateUrl: './mapas-participantes.component.html',
  styleUrls: ['./mapas-participantes.component.css']
})
export class MapasParticipantesComponent implements OnInit {

	private readonly notifier: NotifierService;
	dadosSel: DataMapa[];
	maiorValor: number;
	menorValor: number;

  	constructor(private graficoService: GraficoService, private notifierService: NotifierService) {
  		this.notifier = notifierService;
  	}

  	ngOnInit(): void {
	  	this.obterSelecoesParticipantes();
  	}

  	obterSelecoesParticipantes(): void {
  		this.graficoService.listarBandeiraSelecoesParticipantes().subscribe(
	  		data => {
	  			this.dadosSel = data;
	  			this.getMaiorMenorValor();
	  			this.geraMapa();
	  		}, 
	  		err => { 
	            this.alertErro("Erro ao obter estatísticas."); 
	        });
  	}

  	getMaiorMenorValor(): void {
  		this.maiorValor = 0;
  		this.menorValor = 100000000;
  		this.dadosSel.forEach(dadoSel => {
  			if (dadoSel.valor > this.maiorValor) {
  				this.maiorValor = dadoSel.valor;
  			}
  			if (dadoSel.valor < this.menorValor) {
  				this.menorValor = dadoSel.valor;
  			}
  		});
  	}

  	geraMapa(): void {
  		am4core.useTheme(am4themes_animated);

		let chart = am4core.create("geo_chart_participantes", am4maps.MapChart);
		chart.geodata = am4geodata_worldHigh;
		chart.projection = new am4maps.projections.Miller();
		chart.zoomControl = new am4maps.ZoomControl();
		chart.geodataNames = am4geodata_lang_PT;

		let worldSeries = chart.series.push(new am4maps.MapPolygonSeries());
		worldSeries.useGeodata = true;
		worldSeries.exclude = ["AQ"];
		this.geraTemplate(worldSeries, chart);

		let ukSeries = chart.series.push(new am4maps.MapPolygonSeries());
		ukSeries.geodata = am4geodata_ukCountriesHigh;
		this.geraTemplate(ukSeries, chart);

		this.populaSeries(worldSeries, ukSeries);

		let heatLegend = chart.createChild(am4maps.HeatLegend);
		heatLegend.series = worldSeries;
		heatLegend.align = "right";
		heatLegend.valign = "bottom";
		heatLegend.width = am4core.percent(20);
		heatLegend.marginRight = am4core.percent(10);
		heatLegend.minValue = 0;
		heatLegend.maxValue = this.maiorValor;

		let minRange = heatLegend.valueAxis.axisRanges.create();
		minRange.value = heatLegend.minValue;
		minRange.label.text = this.menorValor.toString() + " vezes";
		let maxRange = heatLegend.valueAxis.axisRanges.create();
		maxRange.value = heatLegend.maxValue;
		maxRange.label.text = this.maiorValor.toString() + " vezes";

		heatLegend.valueAxis.renderer.labels.template.adapter.add("text", function(labelText) {
		  	return "";
		});
		
	}

	geraTemplate(series: am4maps.MapPolygonSeries, chart: am4maps.MapChart): void {
		series.data = [];
		series.heatRules.push({
		  	property: "fill",
		  	target: series.mapPolygons.template,
		  	min: chart.colors.getIndex(1).brighten(2),
		  	max: chart.colors.getIndex(1).brighten(-0.8)
		});

		let mapTemplate = series.mapPolygons.template;
		mapTemplate.tooltipText = "{name}: {value}";
		mapTemplate.nonScalingStroke = true;
		mapTemplate.strokeWidth = 0.5;

		let ukhs = mapTemplate.states.create("hover");
		ukhs.properties.fill = am4core.color("#367B25");
	}

	populaSeries(worldSeries: am4maps.MapPolygonSeries, ukSeries: am4maps.MapPolygonSeries): void {
		let ident = "";
		this.dadosSel.forEach(dadoSel => {
			ident = this.ajusteIdentificador(dadoSel.identificador);
			this.adicionaNaSerie(ukSeries, ident, dadoSel.valor);
			this.adicionaNaSerie(worldSeries, ident, dadoSel.valor);	
		});
	}

	adicionaNaSerie(serie: am4maps.MapPolygonSeries, ident: string, valor: number) {
		console.log(ident + " - " + valor)
		serie.data.push({id: ident, value: valor});
	}

	ajusteIdentificador(identificador: string): string {
		if (identificador === "EN") return "GB-ENG";
		else if (identificador === "WA") return "GB-WLS";
		else if (identificador === "SC") return "GB-SCT";
		else if (identificador === "JE") return "GB-NIR";
		else if (identificador === "CT") return "HR";
		else return identificador;
	}

  	alertErro(msg: string): void {
      this.notifier.notify("error", msg);
    }

    

}
