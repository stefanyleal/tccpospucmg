package com.controle.academia.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.controle.academia.model.Pessoa;

@Repository
public interface PessoaDao extends CrudRepository<Pessoa, Long> {

}
