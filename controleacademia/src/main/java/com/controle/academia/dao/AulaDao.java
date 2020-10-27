package com.controle.academia.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.controle.academia.model.Aula;

@Repository
public interface AulaDao extends CrudRepository<Aula, Long> {

	public Aula findByIdinstrutor(Long idinstrutor);
	
}
