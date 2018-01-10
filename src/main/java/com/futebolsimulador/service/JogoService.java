package com.futebolsimulador.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.futebolsimulador.model.entity.InfoSelecaoNoGrupo;
import com.futebolsimulador.model.entity.Jogo;
import com.futebolsimulador.model.entity.Selecao;
import com.futebolsimulador.model.enuns.Resultado;
import com.futebolsimulador.repository.JogoRepository;

@Service
public class JogoService {
	
	@Autowired
	private JogoRepository jogoRepository;
	
	public Jogo geraJogo(Selecao selecao1, Selecao selecao2, Boolean podeEmpatar){
		Jogo jogo = new Jogo(selecao1, selecao2, podeEmpatar);
		return jogo;
	}
	
	public ArrayList<Jogo> getJogosGrupo(Boolean empate, ArrayList<InfoSelecaoNoGrupo> infoSels) {
		ArrayList<Jogo> jogos = new ArrayList<Jogo>();
		jogos.add(geraJogoGrupo(infoSels.get(0), infoSels.get(1), empate));
		jogos.add(geraJogoGrupo(infoSels.get(2), infoSels.get(3), empate));
		jogos.add(geraJogoGrupo(infoSels.get(0), infoSels.get(2), empate));
		jogos.add(geraJogoGrupo(infoSels.get(1), infoSels.get(3), empate));
		jogos.add(geraJogoGrupo(infoSels.get(0), infoSels.get(3), empate));
		jogos.add(geraJogoGrupo(infoSels.get(1), infoSels.get(2), empate));
		return jogos;
	}
	
	public Jogo geraJogoGrupo(InfoSelecaoNoGrupo infoSelecao1, InfoSelecaoNoGrupo infoSelecao2, Boolean podeEmpatar){
		Jogo jogo = new Jogo(infoSelecao1.getSelecao(), infoSelecao2.getSelecao(), podeEmpatar);
		
		if (Resultado.TIME1.equals(jogo.getResultado())){
			infoSelecao1.setPontos(infoSelecao1.getPontos() + 3);
		} else if (Resultado.TIME2.equals(jogo.getResultado())){
			infoSelecao2.setPontos(infoSelecao2.getPontos() + 3);
		} else if (Resultado.EMPATE.equals(jogo.getResultado())){
			infoSelecao1.setPontos(infoSelecao1.getPontos() + 1);
			infoSelecao2.setPontos(infoSelecao2.getPontos() + 1);
		}
		
		infoSelecao1.setGolsMarcados(infoSelecao1.getGolsMarcados() + jogo.getGols1());
		infoSelecao1.setGolsSofridos(infoSelecao1.getGolsSofridos() + jogo.getGols2());
		infoSelecao2.setGolsMarcados(infoSelecao2.getGolsMarcados() + jogo.getGols2());
		infoSelecao2.setGolsSofridos(infoSelecao2.getGolsSofridos() + jogo.getGols1());
		
		return jogo;
	}

}
