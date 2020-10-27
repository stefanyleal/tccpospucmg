/**
 * Funções para selecionar os states da HomePage
 *
 * @author Stéfany Leal
 */

import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const makeSelectCountCliente = () => createSelector(
  selectHome,
  (homeState) => homeState.get('countCliente')
);

const makeSelectCountInstrutor = () => createSelector(
  selectHome,
  (homeState) => homeState.get('countInstrutor')
);

const makeSelectInsertCliente = () => createSelector(
  selectHome,
  (homeState) => homeState.get('insertCliente')
);

const makeSelectInsertInstrutor = () => createSelector(
  selectHome,
  (homeState) => homeState.get('insertInstrutor')
);

export {
  selectHome,
  makeSelectCountCliente,
  makeSelectCountInstrutor,
  makeSelectInsertCliente,
  makeSelectInsertInstrutor
};
