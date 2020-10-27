/**
 * Componente que renderiza cade item do menu de navegação como link
 *
 * @author Stéfany Leal
 */

import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import GenericTooltip from 'components/GenericTooltip';
import './style.scss';

// eslint-disable-next-line react/prefer-stateless-function
class NavbarLinkItem extends React.Component {
  render() {
    const { page, icon, title } = this.props;
    return (
      <GenericTooltip
        container={
          <NavLink
            className="router-link"
            to={page}
            activeClassName="actived_link"
          >
            <div className="navbar_item">
              {icon}
            </div>
          </NavLink>
        }
        tooltip={<span>{title}</span>}
        position="right"
      />
    );
  }
}

NavbarLinkItem.propTypes = {
  page: PropTypes.string,
  icon: PropTypes.object,
  title: PropTypes.string
};

export default NavbarLinkItem;
