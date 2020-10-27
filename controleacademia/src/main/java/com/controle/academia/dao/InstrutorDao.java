package com.controle.academia.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.controle.academia.model.Instrutor;

@Repository
public interface InstrutorDao extends CrudRepository<Instrutor, Long> {

}
