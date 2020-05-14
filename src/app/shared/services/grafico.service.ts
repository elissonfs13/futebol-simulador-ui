import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';

@Injectable()
export class GraficoService {

	private readonly PATH_SELECAO: string = 'grafico/selecao';
	private readonly PATH_CAMPEONATO: string = 'grafico/campeonato';
	private readonly PATH_CAMPEOES: string = 'grafico/campeoes';
	private readonly PATH_PARTICIPANTES: string = 'grafico/participantes';

	constructor(private http: HttpClient) {}

	listarSelecoesCampeas(): any {
		return this.http.get(env.baseUrl + this.PATH_CAMPEOES + '/selecao');
	}

	listarConfederacoesCampeas(): any {
		return this.http.get(env.baseUrl + this.PATH_CAMPEOES + '/confederacao');
	}

	listarBandeiraSelecoesCampeas(): any {
		return this.http.get(env.baseUrl + this.PATH_CAMPEOES + '/bandeira');
	}

	listarPosicoesSelecoes(id: string): any {
		return this.http.get(env.baseUrl + this.PATH_SELECAO + '/' + id + '/colocacoes');
	}

	listarPosicoesCampeonato(id: string): any {
		return this.http.get(env.baseUrl + this.PATH_CAMPEONATO + '/' + id + '/colocacoes');
	}

	listarSelecoesParticipantes(): any {
		return this.http.get(env.baseUrl + this.PATH_PARTICIPANTES + '/selecao');
	}

	listarBandeiraSelecoesParticipantes(): any {
		return this.http.get(env.baseUrl + this.PATH_PARTICIPANTES + '/bandeira');
	}

}