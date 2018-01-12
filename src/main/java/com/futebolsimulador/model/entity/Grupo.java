package com.futebolsimulador.model.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Grupo implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "grupo_id")
	private Long id;
	
	private String nome;
	
	@OneToMany(mappedBy = "grupo", fetch = FetchType.EAGER)
    @JsonManagedReference
	private List<InfoSelecaoNoGrupo> infoSelecoes;
	
	@OneToMany(mappedBy = "grupo", fetch = FetchType.EAGER)
    @JsonManagedReference
	private List<Jogo> jogos;
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name="campeonato_id")
    @JsonBackReference
	private Campeonato campeonato;

	public Long getId() {
		return id;
	}

	public Grupo(String nome) {
		super();
		this.nome = nome;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public List<InfoSelecaoNoGrupo> getInfoSelecoes() {
		return infoSelecoes;
	}

	public void setInfoSelecoes(List<InfoSelecaoNoGrupo> infoSelecoes) {
		this.infoSelecoes = infoSelecoes;
	}

	public List<Jogo> getJogos() {
		return jogos;
	}

	public void setJogos(List<Jogo> jogos) {
		this.jogos = jogos;
	}

	public Campeonato getCampeonato() {
		return campeonato;
	}

	public void setCampeonato(Campeonato campeonato) {
		this.campeonato = campeonato;
	}

}
