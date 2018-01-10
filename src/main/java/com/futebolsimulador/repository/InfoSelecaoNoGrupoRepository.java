package com.futebolsimulador.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.futebolsimulador.model.entity.InfoSelecaoNoGrupo;

@Repository
public interface InfoSelecaoNoGrupoRepository extends JpaRepository<InfoSelecaoNoGrupo,Long> {

}
