package com.futebolsimulador.service;

import java.util.ArrayList;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.futebolsimulador.model.entity.Campeonato;
import com.futebolsimulador.model.entity.Grupo;
import com.futebolsimulador.model.entity.InfoSelecaoNoGrupo;
import com.futebolsimulador.model.entity.Selecao;
import com.futebolsimulador.repository.GrupoRepository;
import com.futebolsimulador.repository.InfoSelecaoNoGrupoRepository;

@Service
public class GrupoService {
	
	@Autowired
	private GrupoRepository grupoRepository;
	
	@Autowired
	private JogoService jogoService;
	
	@Autowired
	private InfoSelecaoNoGrupoRepository infoSelecaoNoGrupoRepository;
	
	public ArrayList<Grupo> geraGrupos(Campeonato campeonato, ArrayList<Selecao> selecoes){
		ArrayList<Grupo> grupos = new ArrayList<Grupo>();
		String[] nomeGrupos = {"A", "B", "C", "D", "E", "F", "G", "H"};
		int num = 0;
		for (int i = 0; i < 8; i++){
			grupos.add(novoGrupo(campeonato, nomeGrupos[i], selecoes.get(num), selecoes.get(num+1), selecoes.get(num+2), selecoes.get(num+3)));
			num = num + 4;
		}
		return grupos;
	}
	
	public Grupo novoGrupo(Campeonato campeonato, String nome, Selecao sel1, Selecao sel2, Selecao sel3, Selecao sel4){
		Boolean empate = Boolean.TRUE;
		Grupo grupo = new Grupo(nome);
		ArrayList<InfoSelecaoNoGrupo> infoSelecoes = getInfosSels(grupo, sel1, sel2, sel3, sel4);
		grupo.setJogos(jogoService.getJogosGrupo(grupo, empate, infoSelecoes));
		calculaSaldoGols(infoSelecoes);
		calculaClassificacao(infoSelecoes);
		grupo.setInfoSelecoes(infoSelecoes);
		grupo.setCampeonato(campeonato);
		grupoRepository.save(grupo);
		return grupo;
	}

	

	private void calculaClassificacao(ArrayList<InfoSelecaoNoGrupo> infoSelecoes) {
		Collections.sort(infoSelecoes);
		int posicao = 1;
		for (InfoSelecaoNoGrupo infoSelecao : infoSelecoes){
			infoSelecao.setClassificacao(new Integer(posicao));
			posicao++;
		}
	}

	private void calculaSaldoGols(ArrayList<InfoSelecaoNoGrupo> infoSelecoes) {
		for (InfoSelecaoNoGrupo infoSelecao : infoSelecoes){
			infoSelecao.setSaldoGols(infoSelecao.getGolsMarcados() - infoSelecao.getGolsSofridos());
		}
	}

	private ArrayList<InfoSelecaoNoGrupo> getInfosSels(Grupo grupo, Selecao sel1, Selecao sel2, Selecao sel3, Selecao sel4) {
		ArrayList<InfoSelecaoNoGrupo> infoSels = new ArrayList<InfoSelecaoNoGrupo>();
		infoSels.add(createInfoSelecaoNoGrupo(sel1, grupo));
		infoSels.add(createInfoSelecaoNoGrupo(sel2, grupo));
		infoSels.add(createInfoSelecaoNoGrupo(sel3, grupo));
		infoSels.add(createInfoSelecaoNoGrupo(sel4, grupo));
		return infoSels;
	}

	private InfoSelecaoNoGrupo createInfoSelecaoNoGrupo(Selecao sel1, Grupo grupo) {
		InfoSelecaoNoGrupo info = new InfoSelecaoNoGrupo(sel1);
		info.setGrupo(grupo);
		infoSelecaoNoGrupoRepository.save(info);
		return info;
	}

}
