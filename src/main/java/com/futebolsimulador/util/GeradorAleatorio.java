package com.futebolsimulador.util;

import java.util.Random;

import org.springframework.stereotype.Component;

@Component
public class GeradorAleatorio {
	
	public static void main(String[] args) {

		//instância um objeto da classe Random usando o construtor básico
		Random gerador = new Random();
	    
		//imprime sequência de 10 números inteiros aleatórios entre 0 e 25
	    for (int i = 0; i < 10; i++) {
	    	System.out.println(gerador.nextInt(6));
		}
	}
	
	public Integer getNumRandom(Integer numMax){
		Random gerador = new Random();
		return gerador.nextInt(numMax);
	}

}
