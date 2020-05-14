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

import { GraficoService, CampeonatoService, Campeonato } from '../../shared';

declare class DataMapa {
	identificador: string;
	valor: number;
}

@Component({
  selector: 'app-mapas-colocacoes',
  templateUrl: './mapas-colocacoes.component.html',
  styleUrls: ['./mapas-colocacoes.component.css']
})
export class MapasColocacoesComponent implements OnInit {

  	private readonly notifier: NotifierService;
	dadosSel: DataMapa[];
	campeonatos: Campeonato[];
	campeonato: Campeonato;
	maiorValor: number;

  	constructor(private graficoService: GraficoService, 
  				private campeonatoService: CampeonatoService,
  				private notifierService: NotifierService) {
  		this.notifier = notifierService;
  	}

  	ngOnInit(): void {
  		this.campeonatos = null;
  		this.campeonato = null;
  		this.listarCampeonatos();
  	}

  	listarCampeonatos(): void {
	  	this.campeonatoService.listarCampeonatos().subscribe(
  			data => {
        		this.campeonatos = data as Campeonato[]; 
    	  	},
  			err => { 
      			this.alertErro(err.error.mensagens); 
      		}
  		);
  	}

  	listarPosicoesCampeonato(campeonatoEscolhido: Campeonato): void {
  		this.campeonato = campeonatoEscolhido;
  		this.graficoService.listarPosicoesCampeonato(campeonatoEscolhido.id).subscribe(
	  		data => {
	  			this.dadosSel = data;
	  			this.getMaiorValor();
	  			this.geraMapa();
	  		}, 
	  		err => { 
	            this.alertErro("Erro ao obter estatísticas."); 
	        }
	    );
  	}

  	getMaiorValor(): void {
  		this.maiorValor = 0;
  		this.dadosSel.forEach(dadoSel => {
  			if (dadoSel.valor > this.maiorValor) {
  				this.maiorValor = dadoSel.valor;
  			}
  		});
  	}

  	geraMapa(): void {
		am4core.useTheme(am4themes_animated);

		let chart = am4core.create("geo_chart_campeonato", am4maps.MapChart);
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
		minRange.label.text = "Fase de Grupos";
		let maxRange = heatLegend.valueAxis.axisRanges.create();
		maxRange.value = heatLegend.maxValue;
		maxRange.label.text = "Campeão";

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
		mapTemplate.tooltipText = "{name}: {desc}";
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
		serie.data.push({id: ident, value: valor, desc: this.getTooltip(valor)});
	}

	ajusteIdentificador(identificador: string): string {
		if (identificador === "EN") return "GB-ENG";
		else if (identificador === "WA") return "GB-WLS";
		else if (identificador === "SC") return "GB-SCT";
		else if (identificador === "JE") return "GB-NIR";
		else if (identificador === "CT") return "HR";
		else return identificador;
	}

	getTooltip(value: number): string {
		let msg = "";
		if (value == 1) msg = "Fase de Grupos";
		else if (value == 2) msg = "Oitavas de Finais";
		else if (value == 3) msg = "Quartas de Finais";
		else if (value == 4) msg = "Quarto Colocado";
		else if (value == 5) msg = "TerceiroColocado";
		else if (value == 6) msg = "Vice Campeão";
		else if (value == 7) msg = "Campeão";
		return msg;
	}

  	alertErro(msg: string): void {
      this.notifier.notify("error", msg);
    }

}
