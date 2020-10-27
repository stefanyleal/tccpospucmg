/**
 * Arquivo de incialização da HomePage, com configuração e definição dos states e das funções utilizados
 *
 * @author Stéfany Leal
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  loadCountCliente,
  loadCountInstrutor,
  insertCliente,
  insertInstrutor
} from './actions';
import {
  makeSelectCountCliente,
  makeSelectCountInstrutor,
  makeSelectInsertCliente,
  makeSelectInsertInstrutor
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import HomePage from './HomePage';

const mapDispatchToProps = (dispatch) => ({
  loadCountCliente: () => { dispatch(loadCountCliente()); },
  loadCountInstrutor: () => { dispatch(loadCountInstrutor()); },
  insertClienteFunc: (cliente) => { dispatch(insertCliente(cliente)); },
  insertInstrutorFunc: (instrutor) => { dispatch(insertInstrutor(instrutor)); }
});

const mapStateToProps = createStructuredSelector({
  countCliente: makeSelectCountCliente(),
  countInstrutor: makeSelectCountInstrutor(),
  insertCliente: makeSelectInsertCliente(),
  insertInstrutor: makeSelectInsertInstrutor()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer, withSaga, withConnect)(HomePage);
export { mapDispatchToProps };
