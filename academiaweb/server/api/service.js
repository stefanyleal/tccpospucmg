/**
 * Serviço que realiza a criação do token do usuário e faz sua decodificação
 * Também realiza a requisição autorização das informaçoes do token e a requisição solicitada
 *
 * @author Stéfany Leal
 */

const fetch = require('isomorphic-fetch');
const jwt = require('jwt-simple');
const moment = require('moment');

require('dotenv').config();

const secretKey = process.env.SECRET_KEY;
const daysToExpire = process.env.DAYS_TO_EXPIRE;

const services = { };

/**
 * Cria um token de autenticação com ID do usuário, ID da aplicação,
 * IP da requisição, data de expiração e uma key secreta
 *
 * @author Stéfany Leal
 */
services.createToken = (userId, reqIp) => {
  const expires = moment().add(daysToExpire, 'days').valueOf();
  if (userId && reqIp) {
    const token = jwt.encode({
      userId, reqIp, expires
    }, secretKey);
    return token;
  }
  throw new Error('Informações não encontradas!');
};

/**
 * Lê o token de autenticação e valida se o mesmo não está expirado
 * e se a requisição foi feita do mesmo IP contido no token
 *
 * @author Stéfany Leal
 */
services.validateToken = (req, res) => {
  const token = req.header('x-access-token');
  try {
    const decoded = jwt.decode(token, secretKey);
    if (decoded.expires <= Date.now()) {
      throw new Error('Acesso expirado!');
    }
    if (decoded.reqIp !== req.ip) {
      throw new Error('Acesso de outro IP!');
    }

    return decoded;
  } catch (err) {
    console.log(err.message);
    const data = {
      error: {
        message: err.message
      }
    };
    res.json({ data });
    return null;
  }
};

/**
 * Executa uma requisição para o serviço solicitado e retorna o resultado
 *
 * @author Stéfany Leal
 */
services.executeRequest = (res, req, requestURL, requestOpts) => {
  fetch(requestURL, requestOpts)
    .then((response) => response.json())
    .then((json) => {
      const data = json;
      if (data.error) {
        console.log('Request Status: 500');
      } else {
        console.log('Request Status: 200');
        if (req.path === '/usuario/login' && !data.error) {
          data.access_token = services.createToken(data.id, req.ip);
        }
      }
      res.json({ data });
    })
    .catch((err) => {
      console.log(err.message);
      const data = {
        error: {
          message: err.message
        }
      };
      res.json({ data });
    });
};

module.exports = services;
