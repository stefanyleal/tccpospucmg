package com.controle.academia.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.controle.academia.model.Instrutor;
import com.controle.academia.service.InstrutorService;
import com.controle.academia.util.ResponseUtil;

@Controller
@RequestMapping(path="/instrutor")
public class InstrutorController {
	
	private static final Logger log = LogManager.getLogger(InstrutorController.class);
	
	@Autowired
	private InstrutorService instrutorService;
	
	/**
	 * Rota responsavel por realizar a contagem dos instrutores
	 * 
	 * @return Total de instrutores
	 * 
	 * @author Stéfany Leal
	 */
	@GetMapping(path="/count")
	@ResponseBody
	public Object count() {
		try {
			return ResponseEntity.ok(this.instrutorService.countInstrutor());
		} catch (Exception e) {
			log.error("Erro na requisição /count", e);
			return ResponseUtil.returnException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
		}
	}
	
	/**
	 * Rota responsavel por realizar a insercao de um instrutor
	 * 
	 * @param instrutor Objeto instrutor
	 * @return Instrutor registrado
	 * 
	 * @author Stéfany Leal
	 */
	@PostMapping
	@ResponseBody
	public Object insert(@RequestBody Instrutor instrutor) {
		try {
			return ResponseEntity.ok(this.instrutorService.registrar(instrutor));
		} catch (Exception e) {
			log.error("Erro na requisição insert.", e);
			return ResponseUtil.returnException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
		}
	}
	
	/**
	 * Rota responsavel por realizar a listagem dos instrutores
	 * 
	 * @return Lista de instrutores
	 * 
	 * @author Stéfany Leal
	 */
	@GetMapping
	@ResponseBody
	public Object list() {
		try {
			return ResponseEntity.ok(this.instrutorService.listar());
		} catch (Exception e) {
			log.error("Erro na requisição list.", e);
			return ResponseUtil.returnException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
		}
	}
	
	/**
	 * Rota responsavel por realizar a delecao de um instrutor
	 * 
	 * @param id ID do instrutor
	 * @return ID do instrutor deletado
	 * 
	 * @author Stéfany Leal
	 */
	@DeleteMapping(path="/{id}")
	@ResponseBody
	public Object delete(@PathVariable Long id) {
		try {
			return ResponseEntity.ok(this.instrutorService.deletar(id));
		} catch (Exception e) {
			log.error("Erro na requisição delete.", e);
			return ResponseUtil.returnException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
		}
	}
	
	/**
	 * Rota responsavel por realizar a edicao de um instrutor
	 * 
	 * @param instrutor Objeto instrutor
	 * @return Instrutor atualizado
	 * 
	 * @author Stéfany Leal
	 */
	@PutMapping(path="/{id}")
	@ResponseBody
	public Object edit(@RequestBody Instrutor instrutor) {
		try {
			return ResponseEntity.ok(this.instrutorService.editar(instrutor));
		} catch (Exception e) {
			log.error("Erro na requisição edit.", e);
			return ResponseUtil.returnException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
		}
	}
	
}
