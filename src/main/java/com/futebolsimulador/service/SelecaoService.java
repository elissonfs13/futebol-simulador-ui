package com.futebolsimulador.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.futebolsimulador.model.entity.Selecao;
import com.futebolsimulador.repository.SelecaoRepository;

@Service
public class SelecaoService {
	
	@Autowired
	private SelecaoRepository selecaoRepository;
	
	public Selecao cadastrar(Selecao selecao) {
		return selecaoRepository.save(selecao);
	}
	
	public List<Selecao> buscarTodos() {
		return selecaoRepository.findAll();
	}
	
	public Selecao buscarPorId(Long id) {
		return selecaoRepository.findOne(id);
	}
	
	public void excluir(Selecao selecao) {
		selecaoRepository.delete(selecao);
	}
	
	public Selecao alterar(Selecao selecao) {
		return selecaoRepository.save(selecao);
	}

}
