package com.controle.academia.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.controle.academia.model.Cliente;

@Repository
public interface ClienteDao extends CrudRepository<Cliente, Long> {
	
}
