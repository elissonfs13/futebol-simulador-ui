package com.futebolsimulador.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.futebolsimulador.model.entity.Grupo;

@Repository
public interface GrupoRepository extends JpaRepository<Grupo,Long> {

}
