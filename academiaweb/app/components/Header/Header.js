/**
 * Componente que renderiza o cabeçalho do sistema
 *
 * @author Stéfany Leal
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  AccountIcon,
  LogoutIcon
} from 'mdi-react';
import GenericTooltip from 'components/GenericTooltip';
import Logo from '../../images/logo.png';
import './style.scss';

class Header extends React.PureComponent {
  render() {
    let userName = '';
    if (this.props.currentUser) {
      if (this.props.currentUser.nmNome) {
        userName = this.props.currentUser.nmNome;
      }
    }

    return (
      <div className="header">
        <div className="ct_header_logo">
          <img src={Logo} alt="Logo TCC" className="header_logo" />
        </div>
        <div className="ct_user_name">
          {userName}
        </div>
        <div className="ct_header_avatar">
          <AccountIcon className="header_avatar" />
        </div>
        <div className="ct_header_icon marginRight25">
          <GenericTooltip
            container={
              <LogoutIcon className="header_icon" onClick={this.props.logoutUser} />
            }
            tooltip={<span>Sair</span>}
            position="bottomRight"
          />
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  currentUser: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  logoutUser: PropTypes.func
};

export default Header;
