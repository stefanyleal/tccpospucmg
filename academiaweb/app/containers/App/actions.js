/**
 * Arquivo com a ações que podem ser disparadas na App
 *
 * @author Stéfany Leal
 *
 */

import {
  SIGN_IN,
  SIGN_OUT,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  CHANGE_EMAIL,
  CHANGE_SENHA
} from './constants';

export function signIn() {
  return {
    type: SIGN_IN,
  };
}

export function signOut() {
  return {
    type: SIGN_OUT,
  };
}

export function loginSuccess(user) {
  return {
    type: SIGN_IN_SUCCESS,
    user
  };
}

export function loginError(error) {
  return {
    type: SIGN_IN_ERROR,
    error
  };
}

export function changeEmail(email) {
  return {
    type: CHANGE_EMAIL,
    email
  };
}

export function changeSenha(senha) {
  return {
    type: CHANGE_SENHA,
    senha
  };
}
