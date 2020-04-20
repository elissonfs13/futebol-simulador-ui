import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';

import { Selecao } from '../models';

@Injectable()
export class SelecaoService {

	private readonly PATH: string = 'selecao';
	private readonly PATH_BANDEIRAS: string = 'bandeiras';

	constructor(private http: HttpClient) { }

	listarSelecoes(): Observable<any> {
		return this.http.get(env.baseUrl + this.PATH);
	}

	salvarSelecao(selecao: Selecao): Observable<any> {
		return this.http.post(env.baseUrl + this.PATH, selecao);
	}

	preCadastro(): Observable<any> {
		return this.http.get(env.baseUrl + this.PATH + "/pre");	
	}

	getSelecao(idSelecao: number): Observable<any> {
		return this.http.get(env.baseUrl + this.PATH + '/' + idSelecao);
	}

	deletarSelecao(idSelecao: number): Observable<any> {
		return this.http.delete(env.baseUrl + this.PATH + '/' + idSelecao);
	}

	editarSelecao(selecao: Selecao): Observable<any> {
		return this.http.put(env.baseUrl + this.PATH + '/' + selecao.id, selecao);
	}

	getBandeiras(): Observable<any> {
		return this.http.get(env.baseUrl + this.PATH_BANDEIRAS);
	}

}