/**
 * Arquivo de incialização da LoginPage, com configuração e definição dos states e das funções utilizados
 *
 * @author Stéfany Leal
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { signIn, changeEmail, changeSenha } from 'containers/App/actions';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectEmail,
  makeSelectSenha,
} from 'containers/App/selectors';
import LoginPage from './LoginPage';

const mapDispatchToProps = (dispatch) => ({
  onChangeEmail: (evt) => dispatch(changeEmail(evt.target.value)),
  onChangeSenha: (evt) => dispatch(changeSenha(evt.target.value)),
  onSubmitForm: (evt) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    dispatch(signIn());
  }
});

const mapStateToProps = createStructuredSelector({
  email: makeSelectEmail(),
  senha: makeSelectSenha(),
  loading: makeSelectLoading(),
  error: makeSelectError()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(LoginPage);
export { mapDispatchToProps };
