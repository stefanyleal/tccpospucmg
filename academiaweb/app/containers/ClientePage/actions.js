/**
 * Arquivo com as ações que podem ser disparadas na ClientePage
 *
 * @author Stéfany Leal
 */

import {
  LOAD_CLIENTE,
  LOAD_CLIENTE_SUCCESS,
  LOAD_CLIENTE_ERROR,

  DELETE_CLIENTE,
  DELETE_CLIENTE_SUCCESS,
  DELETE_CLIENTE_ERROR,

  EDIT_CLIENTE,
  EDIT_CLIENTE_SUCCESS,
  EDIT_CLIENTE_ERROR
} from './constants';

export function loadCliente() {
  return {
    type: LOAD_CLIENTE
  };
}
export function loadClienteSuccess(data) {
  return {
    type: LOAD_CLIENTE_SUCCESS,
    data
  };
}
export function loadClienteError(error) {
  return {
    type: LOAD_CLIENTE_ERROR,
    error
  };
}

export function deleteCliente(id) {
  return {
    type: DELETE_CLIENTE,
    id
  };
}
export function deleteClienteSuccess(data) {
  return {
    type: DELETE_CLIENTE_SUCCESS,
    data
  };
}
export function deleteClienteError(error) {
  return {
    type: DELETE_CLIENTE_ERROR,
    error
  };
}

export function editCliente(cliente) {
  return {
    type: EDIT_CLIENTE,
    cliente
  };
}
export function editClienteSuccess(data) {
  return {
    type: EDIT_CLIENTE_SUCCESS,
    data
  };
}
export function editClienteError(error) {
  return {
    type: EDIT_CLIENTE_ERROR,
    error
  };
}
