import { Selecao } from './selecao.model';

export class InfoSelecaoNoGrupo {

	constructor(public selecao: Selecao,
				public pontos: string,
				public golsMarcados: string,
				public golsSofridos: string,
				public saldoGols: string,
				public classificacao: string,
				public id?: string) {}
}