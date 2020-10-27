/**
 * Funções para setar os states quando uma action é disparada da ClientePage
 *
 * @author Stéfany Leal
 */

import { fromJS } from 'immutable';

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

import { SIGN_OUT } from '../App/constants';

const initialState = fromJS({
  cliente: false,
  deleteCliente: false,
  editCliente: false
});

function clienteReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_OUT:
      return initialState;

    case LOAD_CLIENTE:
      return state
        .set('cliente', {
          data: false,
          loading: true,
          error: false
        });
    case LOAD_CLIENTE_SUCCESS:
      return state
        .set('cliente', {
          data: action.data,
          loading: false,
          error: false
        });
    case LOAD_CLIENTE_ERROR:
      return state
        .set('cliente', {
          data: false,
          loading: false,
          error: action.error
        });

    case DELETE_CLIENTE:
      return state
        .set('deleteCliente', {
          data: false,
          loading: true,
          error: false
        });
    case DELETE_CLIENTE_SUCCESS:
      return state
        .set('deleteCliente', {
          data: action.data,
          loading: false,
          error: false
        });
    case DELETE_CLIENTE_ERROR:
      return state
        .set('deleteCliente', {
          data: false,
          loading: false,
          error: action.error
        });

    case EDIT_CLIENTE:
      return state
        .set('editCliente', {
          data: false,
          loading: true,
          error: false
        });
    case EDIT_CLIENTE_SUCCESS:
      return state
        .set('editCliente', {
          data: action.data,
          loading: false,
          error: false
        });
    case EDIT_CLIENTE_ERROR:
      return state
        .set('editCliente', {
          data: false,
          loading: false,
          error: action.error
        });

    default:
      return state;
  }
}

export default clienteReducer;
