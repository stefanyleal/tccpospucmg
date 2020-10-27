/**
 * Arquivo de incialização da ClientePage, com configuração e definição dos states e das funções utilizados
 *
 * @author Stéfany Leal
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  loadCliente,
  deleteCliente,
  editCliente
} from './actions';
import {
  makeSelectCliente,
  makeSelectDeleteCliente,
  makeSelectEditCliente
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import ClientePage from './ClientePage';

const mapDispatchToProps = (dispatch) => ({
  loadCliente: () => { dispatch(loadCliente()); },
  deleteClienteFunc: (id) => { dispatch(deleteCliente(id)); },
  editClienteFunc: (cliente) => { dispatch(editCliente(cliente)); }
});

const mapStateToProps = createStructuredSelector({
  cliente: makeSelectCliente(),
  deleteCliente: makeSelectDeleteCliente(),
  editCliente: makeSelectEditCliente()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'cliente', reducer });
const withSaga = injectSaga({ key: 'cliente', saga });

export default compose(withReducer, withSaga, withConnect)(ClientePage);
export { mapDispatchToProps };
