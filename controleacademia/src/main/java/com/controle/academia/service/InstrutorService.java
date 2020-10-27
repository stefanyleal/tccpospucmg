package com.controle.academia.service;

import java.util.ArrayList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controle.academia.dao.AulaDao;
import com.controle.academia.dao.InstrutorDao;
import com.controle.academia.dao.PessoaDao;
import com.controle.academia.model.Aula;
import com.controle.academia.model.Instrutor;
import com.controle.academia.model.Pessoa;

@Service
public class InstrutorService {
	
	private static final Logger log = LogManager.getLogger(InstrutorService.class);
	
	@Autowired
    private InstrutorDao instrutorDao;
	@Autowired
    private PessoaDao pessoaDao;
	@Autowired
    private AulaDao aulaDao;
	
	/**
	 * Metodo responsavel por contar os instrutores cadastrados
	 * 
	 * @return Total de instrutores cadastrados
	 * 
	 * @author Stéfany Leal
	 */
	public Long countInstrutor() {
		Long countInstrutor = instrutorDao.count();
		
		return countInstrutor;
	}
	
	/**
	 * Metodo responsavel por registrar um instrutor
	 * 
	 * @param instrutor Instrutor a ser registrado
	 * @return Instrutor ja registrado
	 * 
	 * @author Stéfany Leal
	 */
	public Instrutor registrar(Instrutor instrutor) throws Exception {
		instrutor.setIdpessoa(this.pessoaDao.save(instrutor.getPessoa()).getId());
		instrutor.setId(this.instrutorDao.save(instrutor).getId());
		if (instrutor.isAulagrupo()) {
			instrutor.getAula().setIdinstrutor(instrutor.getId());
			instrutor.getAula().setId(this.aulaDao.save(instrutor.getAula()).getId());
		}
		log.info("Novo instrutor registrado! ID: " + instrutor.getId());
		
		return instrutor;
	}
	
	/**
	 * Metodo responsavel por listar os instrutores cadastrados
	 * 
	 * @return Lista de instrutores
	 * 
	 * @author Stéfany Leal
	 */
	public List<Instrutor> listar() {
		List<Instrutor> instrutores = new ArrayList<>();
		this.instrutorDao.findAll().forEach(instrutor -> {
			instrutor.setPessoa(this.pessoaDao.findById(instrutor.getIdpessoa()).get());
			if (instrutor.isAulagrupo()) {
				instrutor.setAula(this.aulaDao.findByIdinstrutor(instrutor.getId()));
			}
			instrutores.add(instrutor);
		});
		
		return instrutores;
	}
	
	/**
	 * Metodo responsavel por deletar um instrutor
	 * 
	 * @param id ID do instrutor a ser deletado
	 * @return ID do instrutor deletado
	 * 
	 * @author Stéfany Leal
	 */
	public Long deletar(Long id) {
		Instrutor instrutor = this.instrutorDao.findById(id).get();
		Pessoa pessoa = this.pessoaDao.findById(instrutor.getIdpessoa()).get();
		Aula aula = this.aulaDao.findByIdinstrutor(id);
		this.instrutorDao.delete(instrutor);
		this.pessoaDao.delete(pessoa);
		if (aula != null) {
			this.aulaDao.delete(aula);
		}
		
		return id;
	}
	
	/**
	 * Metodo responsavel por editar um instrutor
	 * 
	 * @param inst Instrutor a ser atualizado
	 * @return Instrutor ja atualizado
	 * 
	 * @author Stéfany Leal
	 */
	public Instrutor editar(Instrutor inst) {
		Instrutor instrutor = this.instrutorDao.findById(inst.getId()).get();
		Pessoa pessoa = this.pessoaDao.findById(instrutor.getIdpessoa()).get();
		Aula aula = this.aulaDao.findByIdinstrutor(inst.getId());
		inst.getPessoa().setId(pessoa.getId());
		this.pessoaDao.save(inst.getPessoa());
		inst.setIdpessoa(pessoa.getId());
		this.instrutorDao.save(inst);
		if (!inst.isAulagrupo() && aula != null) {
			this.aulaDao.delete(aula);
		} else if (inst.isAulagrupo()) {
			if (aula != null) {
				inst.getAula().setId(aula.getId());
			}
			inst.getAula().setIdinstrutor(inst.getId());
			this.aulaDao.save(inst.getAula());
		}
		
		return inst;
	}
	
}
