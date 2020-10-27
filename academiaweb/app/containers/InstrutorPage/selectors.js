/**
 * Funções para selecionar os states da InstrutorPage
 *
 * @author Stéfany Leal
 */

import { createSelector } from 'reselect';

const selectInstrutor = (state) => state.get('instrutor');

const makeSelectInstrutor = () => createSelector(
  selectInstrutor,
  (instrutorState) => instrutorState.get('instrutor')
);

const makeSelectDeleteInstrutor = () => createSelector(
  selectInstrutor,
  (instrutorState) => instrutorState.get('deleteInstrutor')
);

const makeSelectEditInstrutor = () => createSelector(
  selectInstrutor,
  (instrutorState) => instrutorState.get('editInstrutor')
);

export {
  selectInstrutor,
  makeSelectInstrutor,
  makeSelectDeleteInstrutor,
  makeSelectEditInstrutor
};
