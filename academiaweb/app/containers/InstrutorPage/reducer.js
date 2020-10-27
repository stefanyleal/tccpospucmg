/**
 * Funções para setar os states quando uma action é disparada da InstrutorPage
 *
 * @author Stéfany Leal
 */

import { fromJS } from 'immutable';

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

import { SIGN_OUT } from '../App/constants';

const initialState = fromJS({
  instrutor: false,
  deleteInstrutor: false,
  editInstrutor: false
});

function instrutorReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_OUT:
      return initialState;

    case LOAD_INSTRUTOR:
      return state
        .set('instrutor', {
          data: false,
          loading: true,
          error: false
        });
    case LOAD_INSTRUTOR_SUCCESS:
      return state
        .set('instrutor', {
          data: action.data,
          loading: false,
          error: false
        });
    case LOAD_INSTRUTOR_ERROR:
      return state
        .set('instrutor', {
          data: false,
          loading: false,
          error: action.error
        });

    case DELETE_INSTRUTOR:
      return state
        .set('deleteInstrutor', {
          data: false,
          loading: true,
          error: false
        });
    case DELETE_INSTRUTOR_SUCCESS:
      return state
        .set('deleteInstrutor', {
          data: action.data,
          loading: false,
          error: false
        });
    case DELETE_INSTRUTOR_ERROR:
      return state
        .set('deleteInstrutor', {
          data: false,
          loading: false,
          error: action.error
        });

    case EDIT_INSTRUTOR:
      return state
        .set('editInstrutor', {
          data: false,
          loading: true,
          error: false
        });
    case EDIT_INSTRUTOR_SUCCESS:
      return state
        .set('editInstrutor', {
          data: action.data,
          loading: false,
          error: false
        });
    case EDIT_INSTRUTOR_ERROR:
      return state
        .set('editInstrutor', {
          data: false,
          loading: false,
          error: action.error
        });

    default:
      return state;
  }
}

export default instrutorReducer;
