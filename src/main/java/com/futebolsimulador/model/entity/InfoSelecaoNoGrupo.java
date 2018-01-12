package com.futebolsimulador.model.entity;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class InfoSelecaoNoGrupo implements Serializable, Comparable<InfoSelecaoNoGrupo>{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "info_id")
	private Long id;
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "grupo_id")
	@JsonBackReference
	private Grupo grupo;
	
	@ManyToOne(fetch=FetchType.EAGER)
	private Selecao selecao;
	
	private Integer pontos;
	
	private Integer golsMarcados;
	
	private Integer golsSofridos;
	
	private Integer saldoGols;
	
	private Integer classificacao;

	public Long getId() {
		return id;
	}

	public InfoSelecaoNoGrupo(Selecao selecao) {
		super();
		this.selecao = selecao;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Grupo getGrupo() {
		return grupo;
	}

	public void setGrupo(Grupo grupo) {
		this.grupo = grupo;
	}

	public Selecao getSelecao() {
		return selecao;
	}

	public void setSelecao(Selecao selecao) {
		this.selecao = selecao;
	}

	public Integer getPontos() {
		return pontos;
	}

	public void setPontos(Integer pontos) {
		this.pontos = pontos;
	}

	public Integer getGolsMarcados() {
		return golsMarcados;
	}

	public void setGolsMarcados(Integer golsMarcados) {
		this.golsMarcados = golsMarcados;
	}

	public Integer getGolsSofridos() {
		return golsSofridos;
	}

	public void setGolsSofridos(Integer golsSofridos) {
		this.golsSofridos = golsSofridos;
	}

	public Integer getSaldoGols() {
		return saldoGols;
	}

	public void setSaldoGols(Integer saldoGols) {
		this.saldoGols = saldoGols;
	}

	public Integer getClassificacao() {
		return classificacao;
	}

	public void setClassificacao(Integer classificacao) {
		this.classificacao = classificacao;
	}

	@Override
	public int compareTo(InfoSelecaoNoGrupo outraInfo) {
		if (this.pontos > outraInfo.getPontos()){
			return -1;
		} else if (this.pontos < outraInfo.getPontos()){
			return 1;
		} else {
			if (this.saldoGols > outraInfo.getSaldoGols()){
				return -1;
			} else if (this.saldoGols < outraInfo.getSaldoGols()){
				return 1;
			} else {
				if (this.golsMarcados > outraInfo.getGolsMarcados()){
					return -1;
				} else if (this.golsMarcados < outraInfo.getGolsMarcados()){
					return 1;
				}
			}
		}
		return 0;
	}
	
	

}
