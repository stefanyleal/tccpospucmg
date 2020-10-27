/**
 * Métodos que fazem as requisições para o backend da App
 *
 * @author Stéfany Leal
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import 'url';
import { SIGN_IN } from './constants';
import {
  loginSuccess,
  loginError
} from './actions';
import {
  makeSelectEmail,
  makeSelectSenha
} from './selectors';

/**
 * Retorna o usuário autenticado
 *
 * @param makeSelectEmail E-mail do usuário
 * @param makeSelectSenha Senha do usuário
 * @returns Informações do usuário
 *
 * @author Stéfany Leal
 */
export function* getLogin() {
  const requestParams = {
    email: yield select(makeSelectEmail()),
    senha: yield select(makeSelectSenha())
  };
  const requestURL = '/api/usuario/login';
  const requestOpts = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    }
  };

  try {
    const response = yield call(request, requestURL, requestOpts, requestParams);
    if (response.data.error) {
      response.data.title = 'Erro ao entrar!';
      response.data.message = 'Verifique suas informações e tente novamente.';
      throw response.data;
    }

    window.localStorage.setItem('pucmg_tcc_access_token', response.data.access_token);
    response.data.access_token = null;

    yield put(loginSuccess(response.data));
  } catch (err) {
    yield put(loginError(err));
  }
}

export default function* retrieveLogin() {
  yield takeLatest(SIGN_IN, getLogin);
}
