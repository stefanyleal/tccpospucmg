package com.controle.academia.interceptor;

import java.util.Date;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.controle.academia.dao.UsuarioDao;
import com.controle.academia.model.Usuario;

@Component
@EnableAutoConfiguration
public class CustomInterceptor extends HandlerInterceptorAdapter {
	
	private static final Logger log = LogManager.getLogger(CustomInterceptor.class);

	@Value("${auth.secretKey}")
	private String secretKey;
	
	@Autowired
	private UsuarioDao usuarioDao;

	private Usuario usuario;
	
	private long start;
	
	/**
	 * Metodo que decodifica o Jason Web Token
	 * 
	 * @param token JWT a ser decodificado
	 * @return Objeto do token decodificado
	 * 
	 * @author Stéfany Leal
	 */
	private DecodedJWT decode(String token) {
		Algorithm algorithm = Algorithm.HMAC256(this.secretKey);
		JWTVerifier verifier = JWT.require(algorithm).build();
		return verifier.verify(token);
	}

	/**
	 * Metodo executado antes de cada requisicao realizada no servico
	 *
	 * @param req     Requisicao recebida
	 * @param res     Resposta que sera enviada
	 * @param handler Metodo que sera executado
	 * 
	 * @author Stéfany Leal
	 */
	@Override
	public boolean preHandle(HttpServletRequest req, HttpServletResponse res, Object handler) throws Exception {
		res.setContentType("application/json; charset=utf-8");
		String errorMessage = "";
		String token = req.getHeader("x-access-token");

		if (token != null && !token.isEmpty()) {
			errorMessage = this.validateToken(req, handler, token);
		} else {
			errorMessage = "Token do usuário não encontrado.";
		}

		if (!errorMessage.equals("")) {
			log.warn("Erro: " + errorMessage + " - " + req.getRequestURL());
			res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			res.getWriter().write("{\"error\":{\"message\":\"" + errorMessage + "\"}}");

			return false;
		}

		req.setAttribute("usuario", this.usuario);
		this.start = System.currentTimeMillis();
		return true;
	}

	/**
	 * Metodo executado apos cada requisicao realizada no servico
	 *
	 * @param req          Requisicao recebida
	 * @param res          Resposta que sera enviada
	 * @param handler      Metodo que sera executado
	 * @param modelAndView Parametro do metodo sobrescrito
	 * 
	 * @author Stéfany Leal
	 */
	@Override
	public void postHandle(HttpServletRequest req, HttpServletResponse res, Object handler, ModelAndView modelAndView) throws Exception {
		long end = System.currentTimeMillis();
		log.info("Response: " + res.getStatus() + " - " + (end - start) + "ms - " + req.getRequestURL() + " - " + this.usuario.getEmail());
	}

	/**
	 * Metodo responsavel por decodificar o token
	 *
	 * @param req     Requisicao recebida
	 * @param handler Metodo que sera executado
	 * @param token   Token do usuario
	 * @return String vazia caso sucesso ou o motivo do erro
	 * 
	 * @author Stéfany Leal
	 */
	private String validateToken(HttpServletRequest req, Object handler, String token) {
		try {
			DecodedJWT decoded = this.decode(token);
			Long userId = decoded.getClaim("userId").asLong();
			Date expires = decoded.getClaim("expires").asDate();
			String reqIp = decoded.getClaim("reqIp").asString();

			if (expires.compareTo(new Date()) <= 0) {
				return "Acesso expirado!";
			}

			return this.validateUsuario(req, handler, userId, reqIp);
		} catch (JWTVerificationException e) {
			log.error("Erro ao decodificar token: ", e);
			return e.getMessage();
		} catch (Exception e) {
			log.error("Erro ao autorizar usuário: ", e);
			return e.getMessage();
		}
	}

	/**
	 * Metodo responsavel por buscar e validar o usuario
	 *
	 * @param req     Requisicao recebida
	 * @param handler Metodo que sera executado
	 * @param userId  ID do usuario
	 * @return String vazia caso sucesso ou o motivo do erro
	 * 
	 * @author Stéfany Leal
	 */
	private String validateUsuario(HttpServletRequest req, Object handler, Long userId, String reqIp) {
		Optional<Usuario> usuario = this.usuarioDao.findById(userId);
		if (!usuario.isPresent()) {
			return "Usuário ID " + userId + " não encontrado!";
		}
		
		this.usuario = usuario.get();
		log.info("Request: " + req.getMethod() + " - " + req.getRequestURL() + " - " + this.usuario.getEmail());
		return "";
	}

}
