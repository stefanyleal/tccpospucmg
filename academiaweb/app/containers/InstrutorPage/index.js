/**
 * Arquivo de incialização da InstrutorPage, com configuração e definição dos states e das funções utilizados
 *
 * @author Stéfany Leal
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  loadInstrutor,
  deleteInstrutor,
  editInstrutor
} from './actions';
import {
  makeSelectInstrutor,
  makeSelectDeleteInstrutor,
  makeSelectEditInstrutor
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import InstrutorPage from './InstrutorPage';

const mapDispatchToProps = (dispatch) => ({
  loadInstrutor: () => { dispatch(loadInstrutor()); },
  deleteInstrutorFunc: (id) => { dispatch(deleteInstrutor(id)); },
  editInstrutorFunc: (instrutor) => { dispatch(editInstrutor(instrutor)); }
});

const mapStateToProps = createStructuredSelector({
  instrutor: makeSelectInstrutor(),
  deleteInstrutor: makeSelectDeleteInstrutor(),
  editInstrutor: makeSelectEditInstrutor()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'instrutor', reducer });
const withSaga = injectSaga({ key: 'instrutor', saga });

export default compose(withReducer, withSaga, withConnect)(InstrutorPage);
export { mapDispatchToProps };
