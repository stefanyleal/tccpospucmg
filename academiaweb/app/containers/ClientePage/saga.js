/**
 * Métodos que fazem as requisições para o backend da ClientePage
 *
 * @author Stéfany Leal
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import {
  loadClienteSuccess,
  loadClienteError,
  deleteClienteSuccess,
  deleteClienteError,
  editClienteSuccess,
  editClienteError
} from './actions';
import {
  LOAD_CLIENTE,
  DELETE_CLIENTE,
  EDIT_CLIENTE
} from './constants';

/**
 * Retorna a lista de clientes registrados
 *
 * @returns Lista de clientes
 *
 * @author Stéfany Leal
 */
export function* getCliente() {
  const requestURL = '/api/cliente';
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

    yield put(loadClienteSuccess(response.data));
  } catch (error) {
    yield put(loadClienteError(error));
  }
}

/**
 * Deleta um cliente
 *
 * @returns Objeto com o resultado da deleção
 *
 * @author Stéfany Leal
 */
export function* deleteCliente(action) {
  const requestURL = `/api/cliente/${action.id}`;
  const requestOpts = {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
    }
  };

  try {
    const response = yield call(request, requestURL, requestOpts);
    if (response.data.error) {
      throw response.data;
    }

    yield put(deleteClienteSuccess(response.data));
  } catch (error) {
    yield put(deleteClienteError(error));
  }
}

/**
 * Edita um cliente
 *
 * @param action Objeto com os parametros
 * @returns Cliente alterado
 *
 * @author Stéfany Leal
 */
export function* editCliente(action) {
  const requestURL = `/api/cliente/${action.cliente.id}`;
  const requestOpts = {
    method: 'PUT',
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

    yield put(editClienteSuccess(response.data));
  } catch (error) {
    yield put(editClienteError(error));
  }
}

export default function* retrievestoClientePage() {
  yield takeLatest(LOAD_CLIENTE, getCliente);
  yield takeLatest(DELETE_CLIENTE, deleteCliente);
  yield takeLatest(EDIT_CLIENTE, editCliente);
}
