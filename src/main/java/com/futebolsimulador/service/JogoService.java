package com.futebolsimulador.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.futebolsimulador.model.entity.Campeonato;
import com.futebolsimulador.model.entity.Grupo;
import com.futebolsimulador.model.entity.InfoSelecaoNoGrupo;
import com.futebolsimulador.model.entity.Jogo;
import com.futebolsimulador.model.entity.Selecao;
import com.futebolsimulador.model.enuns.Resultado;
import com.futebolsimulador.repository.JogoRepository;
import com.futebolsimulador.util.GeradorAleatorio;

@Service
public class JogoService {
	
	@Autowired
	private JogoRepository jogoRepository;
	
	@Autowired
	private GeradorAleatorio gerador;
	
	public Jogo geraJogo(Campeonato campeonato, Selecao selecao1, Selecao selecao2, Boolean podeEmpatar){
		Jogo jogo = criarNovoJogo(selecao1, selecao2, podeEmpatar);
		jogoRepository.save(jogo);
		return jogo;
	}
	
	public ArrayList<Jogo> getJogosGrupo(Grupo grupo, Boolean empate, ArrayList<InfoSelecaoNoGrupo> infoSels) {
		ArrayList<Jogo> jogos = new ArrayList<Jogo>();
		jogos.add(geraJogoGrupo(grupo, infoSels.get(0), infoSels.get(1), empate));
		jogos.add(geraJogoGrupo(grupo, infoSels.get(2), infoSels.get(3), empate));
		jogos.add(geraJogoGrupo(grupo, infoSels.get(0), infoSels.get(2), empate));
		jogos.add(geraJogoGrupo(grupo, infoSels.get(1), infoSels.get(3), empate));
		jogos.add(geraJogoGrupo(grupo, infoSels.get(3), infoSels.get(0), empate));
		jogos.add(geraJogoGrupo(grupo, infoSels.get(2), infoSels.get(1), empate));
		return jogos;
	}
	
	public Jogo geraJogoGrupo(Grupo grupo, InfoSelecaoNoGrupo infoSelecao1, InfoSelecaoNoGrupo infoSelecao2, Boolean podeEmpatar){
		Jogo jogo = criarNovoJogo(infoSelecao1.getSelecao(), infoSelecao2.getSelecao(), podeEmpatar);
		jogo.setGrupo(grupo);
		
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
		
		jogoRepository.save(jogo);
		return jogo;
	}

	private Jogo criarNovoJogo(Selecao selecao1, Selecao selecao2, Boolean podeEmpatar) {
		Jogo jogo = new Jogo(selecao1, selecao2, podeEmpatar);
		gerarResultado(jogo);
		return jogo;
	}
	
	private void gerarResultado(Jogo jogo) {
		if (jogo.getPodeEmpatar()){
			geraGols(jogo);
		} else {
			while (jogo.getGols1().equals(jogo.getGols2())){
				geraGols(jogo);
			}
		}
		jogo.setResultado(verificarResultado(jogo));
	}

	private void geraGols(Jogo jogo) {
		jogo.setGols1(gerador.getNumRandom(jogo.getSelecao1().getNivel()));
		jogo.setGols2(gerador.getNumRandom(jogo.getSelecao2().getNivel()));
	}

	private Resultado verificarResultado(Jogo jogo) {
		if (jogo.getGols1() > jogo.getGols2()){
			return Resultado.TIME1;
		} else if (jogo.getGols1() < jogo.getGols2()){
			return Resultado.TIME2;
		} else {
			return Resultado.EMPATE;
		}
	}

}
