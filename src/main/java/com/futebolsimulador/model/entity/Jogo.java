package com.futebolsimulador.model.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.futebolsimulador.model.enuns.Resultado;
import com.futebolsimulador.util.GeradorAleatorio;

@Entity
public class Jogo implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private GeradorAleatorio gerador;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "jogo_id")
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "selecao1", referencedColumnName = "selecao_id")
	private Selecao selecao1;
	
	private Integer gols1;
	
	@ManyToOne
	@JoinColumn(name = "selecao2", referencedColumnName = "selecao_id")
	private Selecao selecao2;
	
	private Integer gols2;
	
	private Boolean podeEmpatar;
	
	private Resultado resultado;
	
	@ManyToOne
	@JoinColumn(name = "grupo_id")
	private Grupo grupo;
	
	@ManyToOne
	@JoinColumn(name = "campeonato_id")
	private Campeonato campeonato;

	public Long getId() {
		return id;
	}

	public Jogo(Selecao selecao1, Selecao selecao2, Boolean podeEmpatar) {
		super();
		this.selecao1 = selecao1;
		this.selecao2 = selecao2;
		this.podeEmpatar = podeEmpatar;
		gerarResultado();
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Selecao getSelecao1() {
		return selecao1;
	}

	public void setSelecao1(Selecao selecao1) {
		this.selecao1 = selecao1;
	}

	public Integer getGols1() {
		return gols1;
	}

	public void setGols1(Integer gols1) {
		this.gols1 = gols1;
	}

	public Selecao getSelecao2() {
		return selecao2;
	}

	public void setSelecao2(Selecao selecao2) {
		this.selecao2 = selecao2;
	}

	public Integer getGols2() {
		return gols2;
	}

	public void setGols2(Integer gols2) {
		this.gols2 = gols2;
	}

	public Boolean getPodeEmpatar() {
		return podeEmpatar;
	}

	public void setPodeEmpatar(Boolean podeEmpatar) {
		this.podeEmpatar = podeEmpatar;
	}

	public Resultado getResultado() {
		return resultado;
	}

	public void setResultado(Resultado resultado) {
		this.resultado = resultado;
	}
	
	public Grupo getGrupo() {
		return grupo;
	}

	public void setGrupo(Grupo grupo) {
		this.grupo = grupo;
	}

	public Campeonato getCampeonato() {
		return campeonato;
	}

	public void setCampeonato(Campeonato campeonato) {
		this.campeonato = campeonato;
	}

	private void gerarResultado() {
		if (this.podeEmpatar){
			geraGols();
		} else {
			while (this.gols1.equals(gols2)){
				geraGols();
			}
		}
		this.resultado = verificarResultado();
	}

	private void geraGols() {
		this.gols1 = gerador.getNumRandom(selecao1.getNivel());
		this.gols2 = gerador.getNumRandom(selecao2.getNivel());
	}

	private Resultado verificarResultado() {
		if (this.gols1 > this.gols2){
			return Resultado.TIME1;
		} else if (this.gols1 < this.gols2){
			return Resultado.TIME2;
		} else {
			return Resultado.EMPATE;
		}
	}

}
