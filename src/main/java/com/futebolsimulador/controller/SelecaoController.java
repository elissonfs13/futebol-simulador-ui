package com.futebolsimulador.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.futebolsimulador.service.SelecaoService;
import com.futebolsimulador.model.entity.Selecao;

@RestController
@RequestMapping("/selecao")
public class SelecaoController {
	
	@Autowired
	private SelecaoService selecaoService;
	
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Selecao> cadastrarSelecao(@RequestBody Selecao selecao){
		Selecao selecaoCadastrada = selecaoService.cadastrar(selecao);
		return new ResponseEntity<>(selecaoCadastrada, HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<Selecao>> buscarTodasSelecoes(){
		List<Selecao> selecoesBuscadas = selecaoService.buscarTodos();
		return new ResponseEntity<>(selecoesBuscadas, HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/{id}")
	public ResponseEntity<Selecao> buscarClientePorId(@PathVariable Long id) {
		Selecao selecao = selecaoService.buscarPorId(id);
		return new ResponseEntity<>(selecao, HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.DELETE, value = "/{id}" )
	public ResponseEntity<Selecao> excluirSelecao(@PathVariable Long id) {
		Selecao selecaoEncontrada = selecaoService.buscarPorId(id);
		if (selecaoEncontrada==null){
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		selecaoService.excluir(selecaoEncontrada);
		return new ResponseEntity<>( HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.PUT)
	public ResponseEntity<Selecao> alterarSelecao(@RequestBody Selecao selecao) {
		Selecao selecaoAlterada = selecaoService.alterar(selecao);
		return new ResponseEntity<>(selecaoAlterada, HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/pre" )
	public ResponseEntity<Selecao> preCadastro() {
		selecaoService.preCadastroSelecoes();
		return new ResponseEntity<>( HttpStatus.OK);
	}

}
