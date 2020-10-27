/**
 * Página que renderiza as informações exibidas na LoginPage
 *
 * @author Stéfany Leal
 */

import React from 'react';
import PropTypes from 'prop-types';

import LoadingIndicator from 'components/LoadingIndicator';
import InputTextIconRight from 'components/InputTextIconRight';
import ButtonSuccess from 'components/ButtonSuccess';

import { AccountIcon, LockIcon } from 'mdi-react';
import Logo from '../../images/logo.png';
import './style.scss';

export default class LoginPage extends React.PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="ct_login">
        <div className="form_login">
          <img src={Logo} alt="Logo TCC" className="login_logo" />
          <div className="login_message">
            <span className="login_title">Seja bem vinda!</span>
          </div>

          {this.props.loading ?
            <LoadingIndicator />
            :
            <form onSubmit={this.props.onSubmitForm}>
              <div className="ct_login_input" >
                <InputTextIconRight
                  name="login_email"
                  type="email"
                  placeholder="E-mail"
                  icon={<AccountIcon />}
                  value={this.props.email}
                  onChange={this.props.onChangeEmail}
                  inputError={this.props.error}
                />
              </div>
              <br />
              <div className="ct_login_input" >
                <InputTextIconRight
                  name="login_password"
                  type="password"
                  placeholder="Senha"
                  icon={<LockIcon />}
                  value={this.props.senha}
                  onChange={this.props.onChangeSenha}
                  inputError={this.props.error}
                />
              </div>

              <div className="ct_login_button">
                <ButtonSuccess name="login_submit" type="submit" text="Entrar" />
              </div>
            </form>
          }
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  onSubmitForm: PropTypes.func,
  email: PropTypes.string,
  onChangeEmail: PropTypes.func,
  senha: PropTypes.string,
  onChangeSenha: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ])
};
