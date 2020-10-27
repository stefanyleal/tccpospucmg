/**
 * Métodos que fazem as requisições para o backend da InstrutorPage
 *
 * @author Stéfany Leal
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import {
  loadInstrutorSuccess,
  loadInstrutorError,
  deleteInstrutorSuccess,
  deleteInstrutorError,
  editInstrutorSuccess,
  editInstrutorError
} from './actions';
import {
  LOAD_INSTRUTOR,
  DELETE_INSTRUTOR,
  EDIT_INSTRUTOR
} from './constants';

/**
 * Retorna a lista de instrutores registrados
 *
 * @returns Lista de instrutores
 *
 * @author Stéfany Leal
 */
export function* getInstrutor() {
  const requestURL = '/api/instrutor';
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

    yield put(loadInstrutorSuccess(response.data));
  } catch (error) {
    yield put(loadInstrutorError(error));
  }
}

/**
 * Deleta um instrutor
 *
 * @returns Objeto com o resultado da deleção
 *
 * @author Stéfany Leal
 */
export function* deleteInstrutor(action) {
  const requestURL = `/api/instrutor/${action.id}`;
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

    yield put(deleteInstrutorSuccess(response.data));
  } catch (error) {
    yield put(deleteInstrutorError(error));
  }
}

/**
 * Edita um instrutor
 *
 * @param action Objeto com os parametros
 * @returns Instrutor alterado
 *
 * @author Stéfany Leal
 */
export function* editInstrutor(action) {
  const requestURL = `/api/instrutor/${action.instrutor.id}`;
  const requestOpts = {
    method: 'PUT',
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

    yield put(editInstrutorSuccess(response.data));
  } catch (error) {
    yield put(editInstrutorError(error));
  }
}

export default function* retrievestoInstrutorPage() {
  yield takeLatest(LOAD_INSTRUTOR, getInstrutor);
  yield takeLatest(DELETE_INSTRUTOR, deleteInstrutor);
  yield takeLatest(EDIT_INSTRUTOR, editInstrutor);
}
