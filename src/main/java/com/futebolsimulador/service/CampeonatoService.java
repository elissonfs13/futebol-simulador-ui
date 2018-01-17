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

	public Campeonato geraCampeonato(ArrayList<Selecao> selecoes) {
		Campeonato campeonato = criaNovoCampeonato(selecoes);
		campeonato.setGrupos(grupoService.geraGrupos(campeonato, selecoes));
		campeonato.setOitavasFinal(geraOitavasFinal(campeonato));
		campeonato.setQuartasFinal(geraQuartasFinal(campeonato));
		campeonato.setSemiFinal(geraSemiFinal(campeonato));
		geraFinais(campeonato);
		geraClassificacao(campeonato);
		campeonatoRepository.save(campeonato);
		return campeonato;
	}

	private Campeonato criaNovoCampeonato(ArrayList<Selecao> selecoes) {
		Campeonato campeonato = new Campeonato(selecoes.get(0));
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
		campeonato.setTerceiroQuarto(jogoService.geraJogo(campeonato, getPerdedor(campeonato.getSemiFinal().get(0)), getPerdedor(campeonato.getSemiFinal().get(1)), empate));
		campeonato.setFinalCampeonato(jogoService.geraJogo(campeonato, getVencedor(campeonato.getSemiFinal().get(0)), getVencedor(campeonato.getSemiFinal().get(1)), empate));
	}

	private List<Jogo> geraSemiFinal(Campeonato campeonato) {
		Boolean empate = Boolean.FALSE;
		List<Jogo> quartasFinal = campeonato.getQuartasFinal();
		List<Jogo> semi = new ArrayList<Jogo>();
		semi.add(jogoService.geraJogo(campeonato, getVencedor(quartasFinal.get(0)), getVencedor(quartasFinal.get(1)), empate));
		semi.add(jogoService.geraJogo(campeonato, getVencedor(quartasFinal.get(2)), getVencedor(quartasFinal.get(3)), empate));
		return semi;
	}

	private List<Jogo> geraQuartasFinal(Campeonato campeonato) {
		Boolean empate = Boolean.FALSE;
		List<Jogo> oitavasFinal = campeonato.getOitavasFinal();
		List<Jogo> quartas = new ArrayList<Jogo>();
		quartas.add(jogoService.geraJogo(campeonato, getVencedor(oitavasFinal.get(0)), getVencedor(oitavasFinal.get(1)), empate));
		quartas.add(jogoService.geraJogo(campeonato, getVencedor(oitavasFinal.get(2)), getVencedor(oitavasFinal.get(3)), empate));
		quartas.add(jogoService.geraJogo(campeonato, getVencedor(oitavasFinal.get(4)), getVencedor(oitavasFinal.get(5)), empate));
		quartas.add(jogoService.geraJogo(campeonato, getVencedor(oitavasFinal.get(6)), getVencedor(oitavasFinal.get(7)), empate));
		return quartas;
	}

	private List<Jogo> geraOitavasFinal(Campeonato campeonato) {
		Boolean empate = Boolean.FALSE;
		List<Grupo> grupos = campeonato.getGrupos();
		List<Jogo> oitavas = new ArrayList<Jogo>();
		oitavas.add(jogoService.geraJogo(campeonato, grupos.get(0).getInfoSelecoes().get(0).getSelecao(), grupos.get(7).getInfoSelecoes().get(1).getSelecao(), empate));
		oitavas.add(jogoService.geraJogo(campeonato, grupos.get(1).getInfoSelecoes().get(0).getSelecao(), grupos.get(6).getInfoSelecoes().get(1).getSelecao(), empate));
		oitavas.add(jogoService.geraJogo(campeonato, grupos.get(2).getInfoSelecoes().get(0).getSelecao(), grupos.get(5).getInfoSelecoes().get(1).getSelecao(), empate));
		oitavas.add(jogoService.geraJogo(campeonato, grupos.get(3).getInfoSelecoes().get(0).getSelecao(), grupos.get(4).getInfoSelecoes().get(1).getSelecao(), empate));
		oitavas.add(jogoService.geraJogo(campeonato, grupos.get(4).getInfoSelecoes().get(0).getSelecao(), grupos.get(3).getInfoSelecoes().get(1).getSelecao(), empate));
		oitavas.add(jogoService.geraJogo(campeonato, grupos.get(5).getInfoSelecoes().get(0).getSelecao(), grupos.get(2).getInfoSelecoes().get(1).getSelecao(), empate));
		oitavas.add(jogoService.geraJogo(campeonato, grupos.get(6).getInfoSelecoes().get(0).getSelecao(), grupos.get(1).getInfoSelecoes().get(1).getSelecao(), empate));
		oitavas.add(jogoService.geraJogo(campeonato, grupos.get(7).getInfoSelecoes().get(0).getSelecao(), grupos.get(0).getInfoSelecoes().get(1).getSelecao(), empate));
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
