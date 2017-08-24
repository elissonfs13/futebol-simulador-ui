package com.futebolsimulador.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.futebolsimulador.model.entity.Selecao;

@Repository
public interface SelecaoRepository extends JpaRepository<Selecao,Long> {

}
