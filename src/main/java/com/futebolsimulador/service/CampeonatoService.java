package com.futebolsimulador.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.futebolsimulador.model.entity.Campeonato;
import com.futebolsimulador.model.entity.Grupo;
import com.futebolsimulador.model.entity.Jogo;
import com.futebolsimulador.model.entity.Selecao;
import com.futebolsimulador.model.enuns.Resultado;
import com.futebolsimulador.repository.CampeonatoRepository;

@Service
public class CampeonatoService {
	
	@Autowired
	private CampeonatoRepository campeonatoRepository;
	
	@Autowired
	private GrupoService grupoService;
	
	@Autowired
	private JogoService jogoService;
	
	public Campeonato novoCampeonato(ArrayList<Selecao> selecoes) {
		return geraCampeonato(selecoes);
	}
	
	public List<Campeonato> buscarTodos() {
		return campeonatoRepository.findAll();
	}
	
	public Campeonato buscarPorId(Long id) {
		return campeonatoRepository.findOne(id);
	}

	private Campeonato geraCampeonato(ArrayList<Selecao> selecoes) {
		Campeonato campeonato = new Campeonato();
		campeonato.setGrupos(grupoService.geraGrupos(selecoes));
		campeonato.setOitavasFinal(geraOitavasFinal(campeonato.getGrupos()));
		campeonato.setQuartasFinal(geraQuartasFinal(campeonato.getOitavasFinal()));
		campeonato.setSemiFinal(geraSemiFinal(campeonato.getQuartasFinal()));
		geraFinais(campeonato);
		geraClassificacao(campeonato);
		campeonatoRepository.save(campeonato);
		return campeonato;
	}

	private void geraClassificacao(Campeonato campeonato) {
		campeonato.setPrimeiro(getVencedor(campeonato.getFinalCampeonato()));
		campeonato.setSegundo(getPerdedor(campeonato.getFinalCampeonato()));
		campeonato.setTerceiro(getVencedor(campeonato.getTerceiroQuarto()));
		campeonato.setQuarto(getPerdedor(campeonato.getTerceiroQuarto()));
	}

	private void geraFinais(Campeonato campeonato) {
		Boolean empate = Boolean.FALSE;
		campeonato.setTerceiroQuarto(jogoService.geraJogo(getPerdedor(campeonato.getSemiFinal().get(0)), getPerdedor(campeonato.getSemiFinal().get(1)), empate));
		campeonato.setFinalCampeonato(jogoService.geraJogo(getVencedor(campeonato.getSemiFinal().get(0)), getVencedor(campeonato.getSemiFinal().get(1)), empate));
	}

	private ArrayList<Jogo> geraSemiFinal(ArrayList<Jogo> quartasFinal) {
		Boolean empate = Boolean.FALSE;
		ArrayList<Jogo> semi = new ArrayList<Jogo>();
		semi.add(jogoService.geraJogo(getVencedor(quartasFinal.get(0)), getVencedor(quartasFinal.get(1)), empate));
		semi.add(jogoService.geraJogo(getVencedor(quartasFinal.get(2)), getVencedor(quartasFinal.get(3)), empate));
		return semi;
	}

	private ArrayList<Jogo> geraQuartasFinal(ArrayList<Jogo> oitavasFinal) {
		Boolean empate = Boolean.FALSE;
		ArrayList<Jogo> quartas = new ArrayList<Jogo>();
		quartas.add(jogoService.geraJogo(getVencedor(oitavasFinal.get(0)), getVencedor(oitavasFinal.get(1)), empate));
		quartas.add(jogoService.geraJogo(getVencedor(oitavasFinal.get(2)), getVencedor(oitavasFinal.get(3)), empate));
		quartas.add(jogoService.geraJogo(getVencedor(oitavasFinal.get(4)), getVencedor(oitavasFinal.get(5)), empate));
		quartas.add(jogoService.geraJogo(getVencedor(oitavasFinal.get(6)), getVencedor(oitavasFinal.get(7)), empate));
		return quartas;
	}

	private ArrayList<Jogo> geraOitavasFinal(ArrayList<Grupo> grupos) {
		Boolean empate = Boolean.FALSE;
		ArrayList<Jogo> oitavas = new ArrayList<Jogo>();
		oitavas.add(jogoService.geraJogo(grupos.get(0).getInfoSelecoes().get(0).getSelecao(), grupos.get(7).getInfoSelecoes().get(1).getSelecao(), empate));
		oitavas.add(jogoService.geraJogo(grupos.get(1).getInfoSelecoes().get(0).getSelecao(), grupos.get(6).getInfoSelecoes().get(1).getSelecao(), empate));
		oitavas.add(jogoService.geraJogo(grupos.get(2).getInfoSelecoes().get(0).getSelecao(), grupos.get(5).getInfoSelecoes().get(1).getSelecao(), empate));
		oitavas.add(jogoService.geraJogo(grupos.get(3).getInfoSelecoes().get(0).getSelecao(), grupos.get(4).getInfoSelecoes().get(1).getSelecao(), empate));
		oitavas.add(jogoService.geraJogo(grupos.get(4).getInfoSelecoes().get(0).getSelecao(), grupos.get(3).getInfoSelecoes().get(1).getSelecao(), empate));
		oitavas.add(jogoService.geraJogo(grupos.get(5).getInfoSelecoes().get(0).getSelecao(), grupos.get(2).getInfoSelecoes().get(1).getSelecao(), empate));
		oitavas.add(jogoService.geraJogo(grupos.get(6).getInfoSelecoes().get(0).getSelecao(), grupos.get(1).getInfoSelecoes().get(1).getSelecao(), empate));
		oitavas.add(jogoService.geraJogo(grupos.get(7).getInfoSelecoes().get(0).getSelecao(), grupos.get(0).getInfoSelecoes().get(1).getSelecao(), empate));
		return oitavas;
	}
	
	private Selecao getVencedor(Jogo jogo){
		if (Resultado.TIME1.equals(jogo.getResultado())){
			return jogo.getSelecao1();
		} else {
			return jogo.getSelecao2();
		}
	}
	
	private Selecao getPerdedor(Jogo jogo){
		if (Resultado.TIME2.equals(jogo.getResultado())){
			return jogo.getSelecao1();
		} else {
			return jogo.getSelecao2();
		}
	}

}
