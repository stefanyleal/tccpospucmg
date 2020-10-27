/**
 * Arquivo com as ações que podem ser disparadas na InstrutorPage
 *
 * @author Stéfany Leal
 */

import {
  LOAD_INSTRUTOR,
  LOAD_INSTRUTOR_SUCCESS,
  LOAD_INSTRUTOR_ERROR,

  DELETE_INSTRUTOR,
  DELETE_INSTRUTOR_SUCCESS,
  DELETE_INSTRUTOR_ERROR,

  EDIT_INSTRUTOR,
  EDIT_INSTRUTOR_SUCCESS,
  EDIT_INSTRUTOR_ERROR
} from './constants';

export function loadInstrutor() {
  return {
    type: LOAD_INSTRUTOR
  };
}
export function loadInstrutorSuccess(data) {
  return {
    type: LOAD_INSTRUTOR_SUCCESS,
    data
  };
}
export function loadInstrutorError(error) {
  return {
    type: LOAD_INSTRUTOR_ERROR,
    error
  };
}

export function deleteInstrutor(id) {
  return {
    type: DELETE_INSTRUTOR,
    id
  };
}
export function deleteInstrutorSuccess(data) {
  return {
    type: DELETE_INSTRUTOR_SUCCESS,
    data
  };
}
export function deleteInstrutorError(error) {
  return {
    type: DELETE_INSTRUTOR_ERROR,
    error
  };
}

export function editInstrutor(instrutor) {
  return {
    type: EDIT_INSTRUTOR,
    instrutor
  };
}
export function editInstrutorSuccess(data) {
  return {
    type: EDIT_INSTRUTOR_SUCCESS,
    data
  };
}
export function editInstrutorError(error) {
  return {
    type: EDIT_INSTRUTOR_ERROR,
    error
  };
}
