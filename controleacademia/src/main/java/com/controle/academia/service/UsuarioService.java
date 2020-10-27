package com.controle.academia.service;

import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controle.academia.dao.UsuarioDao;
import com.controle.academia.model.Usuario;

@Service
public class UsuarioService {
	
	private static final Logger log = LogManager.getLogger(UsuarioService.class);

	@Autowired
    private UsuarioDao usuarioDao;
	
	/**
	 * Metodo responsavel por buscar um usuario por e-maill e senha
	 * 
	 * @param email E-mail do usuario
	 * @param senha Senha do usuario
	 * @return usuario encontrado
	 * 
	 * @author Stéfany Leal
	 */
	public Usuario retornaUsuario(String email, String senha) {
		Usuario usuario = usuarioDao.findByEmailAndSenha(email, senha);
		log.info("Usuário autenticado: " + usuario.getEmail());
		
		return usuario;
	}
	
	/**
	 * Metodo responsavel por buscar um usuario pelo ID
	 * 
	 * @param id ID do usuario
	 * @return usuario encontrado
	 * 
	 * @author Stéfany Leal
	 */
	public Usuario retornaUsuario(Long id) {
		Optional<Usuario> usuario = usuarioDao.findById(id);
		if (usuario.isPresent()) {
			log.info("Usuário autorizado: " + usuario.get().getEmail());
			
			return usuario.get();
		}
		return null;
	}

}
