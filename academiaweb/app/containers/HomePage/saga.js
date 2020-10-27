/**
 * Métodos que fazem as requisições para o backend da HomePage
 *
 * @author Stéfany Leal
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import {
  loadCountClienteSuccess,
  loadCountClienteError,
  loadCountInstrutorSuccess,
  loadCountInstrutorError,
  insertClienteSuccess,
  insertClienteError,
  insertInstrutorSuccess,
  insertInstrutorError
} from './actions';
import {
  LOAD_COUNT_CLIENTE,
  LOAD_COUNT_INSTRUTOR,
  INSERT_CLIENTE,
  INSERT_INSTRUTOR
} from './constants';

/**
 * Retorna a quantidade de clientes registrados
 *
 * @returns Quantidade de clientes
 *
 * @author Stéfany Leal
 */
export function* getCountCliente() {
  const requestURL = '/api/cliente/count';
  const requestOpts = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    }
  };

  try {
    const response = yield call(request, requestURL, requestOpts);
    if (response.data.error) {
      throw response.data;
    }

    yield put(loadCountClienteSuccess(response.data));
  } catch (error) {
    yield put(loadCountClienteError(error));
  }
}

/**
 * Retorna a quantidade de instrutores registrados
 *
 * @returns Quantidade de instrutores
 *
 * @author Stéfany Leal
 */
export function* getCountInstrutor() {
  const requestURL = '/api/instrutor/count';
  const requestOpts = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    }
  };

  try {
    const response = yield call(request, requestURL, requestOpts);
    if (response.data.error) {
      throw response.data;
    }

    yield put(loadCountInstrutorSuccess(response.data));
  } catch (error) {
    yield put(loadCountInstrutorError(error));
  }
}

/**
 * Insere um cliente
 *
 * @param action Objeto com os parametros
 * @returns Cliente inserido
 *
 * @author Stéfany Leal
 */
export function* insertCliente(action) {
  const requestURL = '/api/cliente';
  const requestOpts = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(action.cliente),
  };

  try {
    const response = yield call(request, requestURL, requestOpts);
    if (response.data.error) {
      throw response.data;
    }

    yield put(insertClienteSuccess(response.data));
  } catch (error) {
    yield put(insertClienteError(error));
  }
}

/**
 * Insere um instrutor
 *
 * @param action Objeto com os parametros
 * @returns Instrutor inserido
 *
 * @author Stéfany Leal
 */
export function* insertInstrutor(action) {
  const requestURL = '/api/instrutor';
  const requestOpts = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(action.instrutor),
  };

  try {
    const response = yield call(request, requestURL, requestOpts);
    if (response.data.error) {
      throw response.data;
    }

    yield put(insertInstrutorSuccess(response.data));
  } catch (error) {
    yield put(insertInstrutorError(error));
  }
}

export default function* retrievestoHomePage() {
  yield takeLatest(LOAD_COUNT_CLIENTE, getCountCliente);
  yield takeLatest(LOAD_COUNT_INSTRUTOR, getCountInstrutor);
  yield takeLatest(INSERT_CLIENTE, insertCliente);
  yield takeLatest(INSERT_INSTRUTOR, insertInstrutor);
}
