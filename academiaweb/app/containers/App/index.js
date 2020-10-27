/**
 * Arquivo de incialização da App, com configuração e definição dos states e das funções utilizados
 *
 * @author Stéfany Leal
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectCurrentUser,
  makeSelectLoginError,
  makeSelectLocation,
} from './selectors';
import { signIn, signOut } from './actions';
import App from './App';

const mapDispatchToProps = (dispatch) => ({
  loginUser: () => dispatch(signIn()),
  logoutUser: () => {
    window.localStorage.removeItem('pucmg_tcc_access_token');
    window.sessionStorage.clear();
    dispatch(signOut());
  }
});

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  loginError: makeSelectLoginError(),
  location: makeSelectLocation(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'global', reducer });
const withSaga = injectSaga({ key: 'global', saga });

export default withRouter(compose(withReducer, withSaga, withConnect)(App));
export { mapDispatchToProps };
