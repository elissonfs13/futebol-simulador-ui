import { Jogo } from './jogo.model';
import { InfoSelecaoNoGrupo } from './infoSelecaoNoGrupo.model';

export class Grupo {

	constructor(public nome: string,
				public jogos: Jogo[],
				public infoSelecoes: InfoSelecaoNoGrupo[],
				public id?: string) {}
}