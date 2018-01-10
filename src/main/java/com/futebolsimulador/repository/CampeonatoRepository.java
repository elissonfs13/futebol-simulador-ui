package com.futebolsimulador.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.futebolsimulador.model.entity.Campeonato;

@Repository
public interface CampeonatoRepository extends JpaRepository<Campeonato,Long> {

}
