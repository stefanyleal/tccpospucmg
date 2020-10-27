/**
 * Funções para setar os states quando uma action é disparada da HomePage
 *
 * @author Stéfany Leal
 */

import { fromJS } from 'immutable';

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
  INSERT_INSTRUTOR_ERROR
} from './constants';

import { SIGN_OUT } from '../App/constants';

const initialState = fromJS({
  countCliente: false,
  countInstrutor: false,
  insertCliente: false,
  insertInstrutor: false
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_OUT:
      return initialState;

    case LOAD_COUNT_CLIENTE:
      return state
        .set('countCliente', {
          data: false,
          loading: true,
          error: false
        });
    case LOAD_COUNT_CLIENTE_SUCCESS:
      return state
        .set('countCliente', {
          data: action.data,
          loading: false,
          error: false
        });
    case LOAD_COUNT_CLIENTE_ERROR:
      return state
        .set('countCliente', {
          data: false,
          loading: false,
          error: action.error
        });

    case LOAD_COUNT_INSTRUTOR:
      return state
        .set('countInstrutor', {
          data: false,
          loading: true,
          error: false
        });
    case LOAD_COUNT_INSTRUTOR_SUCCESS:
      return state
        .set('countInstrutor', {
          data: action.data,
          loading: false,
          error: false
        });
    case LOAD_COUNT_INSTRUTOR_ERROR:
      return state
        .set('countInstrutor', {
          data: false,
          loading: false,
          error: action.error
        });

    case INSERT_CLIENTE:
      return state
        .set('insertCliente', {
          data: false,
          loading: true,
          error: false
        });
    case INSERT_CLIENTE_SUCCESS:
      return state
        .set('insertCliente', {
          data: action.data,
          loading: false,
          error: false
        });
    case INSERT_CLIENTE_ERROR:
      return state
        .set('insertCliente', {
          data: false,
          loading: false,
          error: action.error
        });

    case INSERT_INSTRUTOR:
      return state
        .set('insertInstrutor', {
          data: false,
          loading: true,
          error: false
        });
    case INSERT_INSTRUTOR_SUCCESS:
      return state
        .set('insertInstrutor', {
          data: action.data,
          loading: false,
          error: false
        });
    case INSERT_INSTRUTOR_ERROR:
      return state
        .set('insertInstrutor', {
          data: false,
          loading: false,
          error: action.error
        });

    default:
      return state;
  }
}

export default homeReducer;
