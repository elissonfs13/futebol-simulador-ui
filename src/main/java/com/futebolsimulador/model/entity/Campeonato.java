package com.futebolsimulador.model.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Campeonato implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@ManyToOne(fetch=FetchType.EAGER)
	private Selecao sede;
	
	@OneToMany(mappedBy = "campeonato", fetch = FetchType.EAGER)
    @JsonManagedReference
	private List<Grupo> grupos;
	
	@OneToMany(mappedBy = "campeonato", fetch = FetchType.EAGER)
    @JsonManagedReference
	private List<Jogo> oitavasFinal;
	
	@OneToMany(mappedBy = "campeonato", fetch = FetchType.EAGER)
    @JsonManagedReference
	private List<Jogo> quartasFinal;
	
	@OneToMany(mappedBy = "campeonato", fetch = FetchType.EAGER)
    @JsonManagedReference
	private List<Jogo> semiFinal;
	
	@ManyToOne(fetch=FetchType.EAGER)
	private Jogo terceiroQuarto;
	
	@ManyToOne(fetch=FetchType.EAGER)
	private Jogo finalCampeonato;
	
	@ManyToOne(fetch=FetchType.EAGER)
	private Selecao primeiro;
	
	@ManyToOne(fetch=FetchType.EAGER)
	private Selecao segundo;
	
	@ManyToOne(fetch=FetchType.EAGER)
	private Selecao terceiro;
	
	@ManyToOne(fetch=FetchType.EAGER)
	private Selecao quarto;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public List<Grupo> getGrupos() {
		return grupos;
	}

	public void setGrupos(List<Grupo> grupos) {
		this.grupos = grupos;
	}

	public List<Jogo> getOitavasFinal() {
		return oitavasFinal;
	}

	public void setOitavasFinal(List<Jogo> oitavasFinal) {
		this.oitavasFinal = oitavasFinal;
	}

	public List<Jogo> getQuartasFinal() {
		return quartasFinal;
	}

	public void setQuartasFinal(List<Jogo> quartasFinal) {
		this.quartasFinal = quartasFinal;
	}

	public List<Jogo> getSemiFinal() {
		return semiFinal;
	}

	public void setSemiFinal(List<Jogo> semiFinal) {
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
