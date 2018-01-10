package com.futebolsimulador.model.entity;

import java.io.Serializable;
import java.util.ArrayList;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

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
	
	@OneToMany(mappedBy = "grupo", cascade = CascadeType.ALL)
	@Column(name = "infos")
	private ArrayList<InfoSelecaoNoGrupo> infoSelecoes;
	
	@OneToMany(mappedBy = "grupo", cascade = CascadeType.ALL)
	private ArrayList<Jogo> jogos;

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

	public ArrayList<InfoSelecaoNoGrupo> getInfoSelecoes() {
		return infoSelecoes;
	}

	public void setInfoSelecoes(ArrayList<InfoSelecaoNoGrupo> infoSelecoes) {
		this.infoSelecoes = infoSelecoes;
	}

	public ArrayList<Jogo> getJogos() {
		return jogos;
	}

	public void setJogos(ArrayList<Jogo> jogos) {
		this.jogos = jogos;
	}
	
	

}
