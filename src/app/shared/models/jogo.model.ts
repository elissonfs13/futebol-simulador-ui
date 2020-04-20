import { Selecao } from './selecao.model';

export class Jogo {

	constructor(public selecao1: Selecao,
				public gols1: string,
				public selecao2: Selecao,
				public gols2: string,
				public podeEmpatar: boolean,
				public id?: string) {}
}