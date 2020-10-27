package com.controle.academia.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.controle.academia.model.Usuario;

@Repository
public interface UsuarioDao extends CrudRepository<Usuario, Long> {
	
	Usuario findByEmailAndSenha(String email, String senha);

}
