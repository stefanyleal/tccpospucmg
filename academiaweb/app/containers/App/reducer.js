/**
 * Funções para setar os states quando uma action é disparada da App
 *
 * @author Stéfany Leal
 *
 */

import { fromJS } from 'immutable';

import {
  SIGN_IN,
  SIGN_OUT,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  CHANGE_EMAIL,
  CHANGE_SENHA
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  loginError: false,
  currentUser: false,
  email: '',
  senha: ''
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN:
      return state
        .set('loading', true)
        .set('error', false)
        .set('loginError', false)
        .set('currentUser', false);
    case SIGN_OUT:
      return initialState;
    case SIGN_IN_SUCCESS:
      return state
        .set('currentUser', action.user)
        .set('loading', false);
    case SIGN_IN_ERROR:
      return state
        .set('error', action.error)
        .set('loginError', action.error)
        .set('loading', false)
        .set('currentUser', false);
    case CHANGE_EMAIL:
      return state.set('email', action.email);
    case CHANGE_SENHA:
      return state.set('senha', action.senha);

    default:
      return state;
  }
}

export default appReducer;
