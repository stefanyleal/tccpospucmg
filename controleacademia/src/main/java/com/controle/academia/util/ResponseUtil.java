package com.controle.academia.util;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ResponseUtil {

	private ResponseUtil() {
		// Constructor
	}

	/**
	 * Metodo que transforma uma mensagem de erro em uma resposta http com status
	 *
	 * @param status  Status do erro que sera retornado
	 * @param message Mensagem de erro que sera retornada
	 * @return Resposta http
	 * 
	 * @author Stéfany Leal
	 */
	public static ResponseEntity<String> returnException(HttpStatus status, String message) {
		return ResponseEntity.status(status).body("{\"error\":{\"message\":\"" + message + "\"}}");
	}

}
