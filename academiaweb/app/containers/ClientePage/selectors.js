/**
 * Funções para selecionar os states da ClientePage
 *
 * @author Stéfany Leal
 */

import { createSelector } from 'reselect';

const selectCliente = (state) => state.get('cliente');

const makeSelectCliente = () => createSelector(
  selectCliente,
  (clienteState) => clienteState.get('cliente')
);

const makeSelectDeleteCliente = () => createSelector(
  selectCliente,
  (clienteState) => clienteState.get('deleteCliente')
);

const makeSelectEditCliente = () => createSelector(
  selectCliente,
  (clienteState) => clienteState.get('editCliente')
);

export {
  selectCliente,
  makeSelectCliente,
  makeSelectDeleteCliente,
  makeSelectEditCliente
};
