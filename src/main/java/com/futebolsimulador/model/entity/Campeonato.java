package com.futebolsimulador.model.entity;

import java.io.Serializable;
import java.util.ArrayList;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class Campeonato implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private Selecao sede;
	
	private ArrayList<Grupo> grupos;
	
	@OneToMany(mappedBy = "campeonato", cascade = CascadeType.ALL)
	private ArrayList<Jogo> oitavasFinal;
	
	@OneToMany(mappedBy = "campeonato", cascade = CascadeType.ALL)
	private ArrayList<Jogo> quartasFinal;
	
	@OneToMany(mappedBy = "campeonato", cascade = CascadeType.ALL)
	private ArrayList<Jogo> semiFinal;
	
	@OneToMany(mappedBy = "campeonato", cascade = CascadeType.ALL)
	private Jogo terceiroQuarto;
	
	@OneToMany(mappedBy = "campeonato", cascade = CascadeType.ALL)
	private Jogo finalCampeonato;
	
	@ManyToOne
	@JoinColumn(name = "selecao1", referencedColumnName = "selecao_id")
	private Selecao primeiro;
	
	@ManyToOne
	@JoinColumn(name = "selecao2", referencedColumnName = "selecao_id")
	private Selecao segundo;
	
	@ManyToOne
	@JoinColumn(name = "selecao3", referencedColumnName = "selecao_id")
	private Selecao terceiro;
	
	@ManyToOne
	@JoinColumn(name = "selecao4", referencedColumnName = "selecao_id")
	private Selecao quarto;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public ArrayList<Grupo> getGrupos() {
		return grupos;
	}

	public void setGrupos(ArrayList<Grupo> grupos) {
		this.grupos = grupos;
	}

	public ArrayList<Jogo> getOitavasFinal() {
		return oitavasFinal;
	}

	public void setOitavasFinal(ArrayList<Jogo> oitavasFinal) {
		this.oitavasFinal = oitavasFinal;
	}

	public ArrayList<Jogo> getQuartasFinal() {
		return quartasFinal;
	}

	public void setQuartasFinal(ArrayList<Jogo> quartasFinal) {
		this.quartasFinal = quartasFinal;
	}

	public ArrayList<Jogo> getSemiFinal() {
		return semiFinal;
	}

	public void setSemiFinal(ArrayList<Jogo> semiFinal) {
		this.semiFinal = semiFinal;
	}

	public Jogo getTerceiroQuarto() {
		return terceiroQuarto;
	}

	public void setTerceiroQuarto(Jogo terceiroQuarto) {
		this.terceiroQuarto = terceiroQuarto;
	}

	public Jogo getFinalCampeonato() {
		return finalCampeonato;
	}

	public void setFinalCampeonato(Jogo finalCampeonato) {
		this.finalCampeonato = finalCampeonato;
	}

	public Selecao getPrimeiro() {
		return primeiro;
	}

	public void setPrimeiro(Selecao primeiro) {
		this.primeiro = primeiro;
	}

	public Selecao getSegundo() {
		return segundo;
	}

	public void setSegundo(Selecao segundo) {
		this.segundo = segundo;
	}

	public Selecao getTerceiro() {
		return terceiro;
	}

	public void setTerceiro(Selecao terceiro) {
		this.terceiro = terceiro;
	}

	public Selecao getQuarto() {
		return quarto;
	}

	public void setQuarto(Selecao quarto) {
		this.quarto = quarto;
	}

	public Selecao getSede() {
		return sede;
	}

	public void setSede(Selecao sede) {
		this.sede = sede;
	}

	
}
