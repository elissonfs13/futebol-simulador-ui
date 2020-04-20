import { Selecao } from './selecao.model';
import { Grupo } from './grupo.model';
import { Jogo } from './jogo.model';

export class Campeonato {

	constructor(public sede: Selecao,
				public grupos: Grupo[],
				public oitavasFinal: Jogo[],
				public quartasFinal: Jogo[],
				public semiFinal: Jogo[],
				public terceiroQuarto: Jogo,
				public finalCampeonato: Jogo,
				public primeiro: Selecao,
				public segundo: Selecao,
				public terceiro: Selecao,
				public quarto: Selecao,
				public id?: string) {}
}