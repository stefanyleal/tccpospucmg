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

import com.controle.academia.model.Cliente;
import com.controle.academia.service.ClienteService;
import com.controle.academia.util.ResponseUtil;

@Controller
@RequestMapping(path="/cliente")
public class ClienteController {
	
	private static final Logger log = LogManager.getLogger(ClienteController.class);
	
	@Autowired
	private ClienteService clienteService;
	
	/**
	 * Rota responsavel por realizar a contagem dos clientes
	 * 
	 * @return Total de clientes
	 * 
	 * @author Stéfany Leal
	 */
	@GetMapping(path="/count")
	@ResponseBody
	public Object count() {
		try {
			return ResponseEntity.ok(this.clienteService.countCliente());
		} catch (Exception e) {
			log.error("Erro na requisição /count", e);
			return ResponseUtil.returnException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
		}
	}
	
	/**
	 * Rota responsavel por realizar a insercao de um cliente
	 * 
	 * @param cliente Objeto cliente
	 * @return Cliente registrado
	 * 
	 * @author Stéfany Leal
	 */
	@PostMapping
	@ResponseBody
	public Object insert(@RequestBody Cliente cliente) {
		try {
			return ResponseEntity.ok(this.clienteService.registrar(cliente));
		} catch (Exception e) {
			log.error("Erro na requisição insert.", e);
			return ResponseUtil.returnException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
		}
	}
	
	/**
	 * Rota responsavel por realizar a listagem dos clientes
	 * 
	 * @return Lista de clientes
	 * 
	 * @author Stéfany Leal
	 */
	@GetMapping
	@ResponseBody
	public Object list() {
		try {
			return ResponseEntity.ok(this.clienteService.listar());
		} catch (Exception e) {
			log.error("Erro na requisição list.", e);
			return ResponseUtil.returnException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
		}
	}
	
	/**
	 * Rota responsavel por realizar a delecao de um cliente
	 * 
	 * @param id ID do cliente
	 * @return ID do cliente deletado
	 * 
	 * @author Stéfany Leal
	 */
	@DeleteMapping(path="/{id}")
	@ResponseBody
	public Object delete(@PathVariable Long id) {
		try {
			return ResponseEntity.ok(this.clienteService.deletar(id));
		} catch (Exception e) {
			log.error("Erro na requisição delete.", e);
			return ResponseUtil.returnException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
		}
	}
	
	/**
	 * Rota responsavel por realizar a edicao de um cliente
	 * 
	 * @param cliente Objeto cliente
	 * @return Cliente atualizado
	 * 
	 * @author Stéfany Leal
	 */
	@PutMapping(path="/{id}")
	@ResponseBody
	public Object edit(@RequestBody Cliente cliente) {
		try {
			return ResponseEntity.ok(this.clienteService.editar(cliente));
		} catch (Exception e) {
			log.error("Erro na requisição edit.", e);
			return ResponseUtil.returnException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
		}
	}
	
}
