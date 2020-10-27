/**
 * Cria as rotas externas e faz a intermediação das requisições
 *
 * @author Stéfany Leal
 *
 */
const express = require('express');

const router = express.Router();
const apiService = require('./service');
const { URL, URLSearchParams } = require('url');

require('dotenv').config();

const backendUrl = process.env.BACKEND_URL;

/**
 * Middleware usado para todas requisições realizadas no sistema, fazendo com que elas sejam redirecionadas
 * para o serviço de back-end, além de realizar uma requisição para a api de autorização primeiramente
 *
 * @param {Object} req Requisição enviada pelo sistema
 * @param {Object} res Resposta da requisição enviada pelo sistema
 * @returns Resposta da requisição que foi redirecionada
 *
 * @author Stéfany Leal
 * */
router.use('/', (req, res) => {
  let requestURL = backendUrl + req.url;
  if (req.query) {
    const fullUrl = new URL(requestURL);
    fullUrl.search = new URLSearchParams(req.query);
    requestURL = fullUrl.href;
  }
  console.log('%s - %s', req.method, requestURL);

  const requestOpts = {
    method: req.method,
    body: req.method === 'GET' ? '' : JSON.stringify(req.body),
    headers: new Headers({
      'Content-type': req.header('content-type'),
      'x-access-token': req.header('x-access-token')
    })
  };

  try {
    if (req.header('x-access-token')) {
      requestOpts.headers = new Headers({
        'Content-type': req.header('content-type'),
        'x-access-token': req.header('x-access-token')
      });

      if (req.path === '/usuario/login') {
        requestURL = requestURL.replace('/login', '/autorizar');
        requestURL = requestURL.replace('?email=', '');
        requestURL = requestURL.replace('&senha=', '');
      }

      apiService.executeRequest(res, req, requestURL, requestOpts);
    } else if (req.path === '/usuario/login') {
      requestURL = requestURL.replace('/login', '/autenticar');
      apiService.executeRequest(res, req, requestURL, requestOpts);
    } else {
      throw new Error('Token não encontrado!');
    }
  } catch (err) {
    console.log(err.message);
    const data = {
      error: {
        message: err.message
      }
    };
    res.json({ data });
  }
});

module.exports = router;
