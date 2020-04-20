import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';

import { Selecao } from '../models';

@Injectable()
export class CampeonatoService {

	private readonly PATH: string = 'campeonato';

  	constructor(private http: HttpClient) { }

  	gerarCampeonato(selecoes: Selecao[]): Observable<any> {
		return this.http.post(env.baseUrl + this.PATH, selecoes);
	}

	getCampeonato(campeonatoId: number): Observable<any> {
		return this.http.get(env.baseUrl + this.PATH + "/" + campeonatoId);
	}

	listarCampeonatos(): Observable<any> {
		return this.http.get(env.baseUrl + this.PATH);
	}

}
