/**
 * Funções para selecionar os states da App
 *
 * @author Stéfany Leal
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const selectRoute = (state) => state.get('route');

const makeSelectEmail = () => createSelector(
  selectGlobal,
  (loginState) => loginState.get('email')
);

const makeSelectSenha = () => createSelector(
  selectGlobal,
  (loginState) => loginState.get('senha')
);

const makeSelectCurrentUser = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('currentUser')
);

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

const makeSelectLoginError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loginError')
);

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);

export {
  selectGlobal,
  makeSelectEmail,
  makeSelectSenha,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectLocation,
  makeSelectLoginError
};
