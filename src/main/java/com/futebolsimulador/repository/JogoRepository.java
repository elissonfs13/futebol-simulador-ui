package com.futebolsimulador.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.futebolsimulador.model.entity.Jogo;

@Repository
public interface JogoRepository extends JpaRepository<Jogo,Long> {

}
