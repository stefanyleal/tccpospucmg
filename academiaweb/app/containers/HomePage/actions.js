/**
 * Arquivo com as ações que podem ser disparadas na HomePage
 *
 * @author Stéfany Leal
 */

import {
  LOAD_COUNT_CLIENTE,
  LOAD_COUNT_CLIENTE_SUCCESS,
  LOAD_COUNT_CLIENTE_ERROR,

  LOAD_COUNT_INSTRUTOR,
  LOAD_COUNT_INSTRUTOR_SUCCESS,
  LOAD_COUNT_INSTRUTOR_ERROR,

  INSERT_CLIENTE,
  INSERT_CLIENTE_SUCCESS,
  INSERT_CLIENTE_ERROR,

  INSERT_INSTRUTOR,
  INSERT_INSTRUTOR_SUCCESS,
  INSERT_INSTRUTOR_ERROR,
} from './constants';

export function loadCountCliente() {
  return {
    type: LOAD_COUNT_CLIENTE
  };
}
export function loadCountClienteSuccess(data) {
  return {
    type: LOAD_COUNT_CLIENTE_SUCCESS,
    data
  };
}
export function loadCountClienteError(error) {
  return {
    type: LOAD_COUNT_CLIENTE_ERROR,
    error
  };
}

export function loadCountInstrutor() {
  return {
    type: LOAD_COUNT_INSTRUTOR
  };
}
export function loadCountInstrutorSuccess(data) {
  return {
    type: LOAD_COUNT_INSTRUTOR_SUCCESS,
    data
  };
}
export function loadCountInstrutorError(error) {
  return {
    type: LOAD_COUNT_INSTRUTOR_ERROR,
    error
  };
}

export function insertCliente(cliente) {
  return {
    type: INSERT_CLIENTE,
    cliente
  };
}
export function insertClienteSuccess(data) {
  return {
    type: INSERT_CLIENTE_SUCCESS,
    data
  };
}
export function insertClienteError(error) {
  return {
    type: INSERT_CLIENTE_ERROR,
    error
  };
}

export function insertInstrutor(instrutor) {
  return {
    type: INSERT_INSTRUTOR,
    instrutor
  };
}
export function insertInstrutorSuccess(data) {
  return {
    type: INSERT_INSTRUTOR_SUCCESS,
    data
  };
}
export function insertInstrutorError(error) {
  return {
    type: INSERT_INSTRUTOR_ERROR,
    error
  };
}
