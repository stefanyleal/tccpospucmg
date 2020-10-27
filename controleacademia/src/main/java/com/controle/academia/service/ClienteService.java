package com.controle.academia.service;

import java.util.ArrayList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controle.academia.dao.ClienteDao;
import com.controle.academia.dao.PessoaDao;
import com.controle.academia.model.Cliente;
import com.controle.academia.model.Pessoa;

@Service
public class ClienteService {
	
	private static final Logger log = LogManager.getLogger(ClienteService.class);

	@Autowired
    private ClienteDao clienteDao;
	@Autowired
    private PessoaDao pessoaDao;
	
	/**
	 * Metodo responsavel por contar os clientes cadastrados
	 * 
	 * @return Total de clientes cadastrados
	 * 
	 * @author Stéfany Leal
	 */
	public Long countCliente() {
		Long countCliente = clienteDao.count();
		
		return countCliente;
	}
	
	/**
	 * Metodo responsavel por registrar um cliente
	 * 
	 * @param cliente Cliente a ser registrado
	 * @return Cliente ja registrado
	 * 
	 * @author Stéfany Leal
	 */
	public Cliente registrar(Cliente cliente) throws Exception {
		cliente.setIdpessoa(this.pessoaDao.save(cliente.getPessoa()).getId());
		cliente.setId(this.clienteDao.save(cliente).getId());
		log.info("Novo cliente registrado! ID: " + cliente.getId());
		
		return cliente;
	}
	
	/**
	 * Metodo responsavel por listar os clientes cadastrados
	 * 
	 * @return Lista de clientes
	 * 
	 * @author Stéfany Leal
	 */
	public List<Cliente> listar() {
		List<Cliente> clientes = new ArrayList<>();
		this.clienteDao.findAll().forEach(cliente -> {
			cliente.setPessoa(this.pessoaDao.findById(cliente.getIdpessoa()).get());
			clientes.add(cliente);
		});
		
		return clientes;
	}
	
	/**
	 * Metodo responsavel por deletar um cliente
	 * 
	 * @param id ID do cliente a ser deletado
	 * @return ID do cliente deletado
	 * 
	 * @author Stéfany Leal
	 */
	public Long deletar(Long id) {
		Cliente cliente = this.clienteDao.findById(id).get();
		Pessoa pessoa = this.pessoaDao.findById(cliente.getIdpessoa()).get();
		this.clienteDao.delete(cliente);
		this.pessoaDao.delete(pessoa);
		
		return id;
	}
	
	/**
	 * Metodo responsavel por editar um cliente
	 * 
	 * @param cli Cliente a ser atualizado
	 * @return Cliente ja atualizado
	 * 
	 * @author Stéfany Leal
	 */
	public Cliente editar(Cliente cli) {
		Cliente cliente = this.clienteDao.findById(cli.getId()).get();
		Pessoa pessoa = this.pessoaDao.findById(cliente.getIdpessoa()).get();
		cli.getPessoa().setId(pessoa.getId());
		this.pessoaDao.save(cli.getPessoa());
		cli.setIdpessoa(pessoa.getId());
		this.clienteDao.save(cli);
		
		return cli;
	}
	
}
