package com.controle.academia.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "instrutor")
public class Instrutor implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Long id;
	
	@Column(name = "idpessoa", unique = true, nullable = false)
    private Long idpessoa;
	
	@Column(name = "musculacao", nullable = false)
    private boolean musculacao;
	
	@Column(name = "aulagrupo", nullable = false)
    private boolean aulagrupo;
	
	@Transient
	private Pessoa pessoa;
	
	@Transient
	private Aula aula;
	
	public Instrutor() {
		// Constructor
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getIdpessoa() {
		return idpessoa;
	}

	public void setIdpessoa(Long idpessoa) {
		this.idpessoa = idpessoa;
	}

	public boolean isMusculacao() {
		return musculacao;
	}

	public void setMusculacao(boolean musculacao) {
		this.musculacao = musculacao;
	}

	public boolean isAulagrupo() {
		return aulagrupo;
	}

	public void setAulagrupo(boolean aulagrupo) {
		this.aulagrupo = aulagrupo;
	}

	public Pessoa getPessoa() {
		return pessoa;
	}

	public void setPessoa(Pessoa pessoa) {
		this.pessoa = pessoa;
	}

	public Aula getAula() {
		return aula;
	}

	public void setAula(Aula aula) {
		this.aula = aula;
	}

}
