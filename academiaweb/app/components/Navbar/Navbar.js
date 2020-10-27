/**
 * Componente que renderiza o menu de navegação do sistema
 *
 * @author Stéfany Leal
 */

import React from 'react';
import NavbarLinkItem from 'components/NavbarLinkItem';
import { HomeIcon, WalkIcon, WeightsIcon } from 'mdi-react';
import './style.scss';

class Navbar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="navbar">
        <NavbarLinkItem
          page="/home"
          icon={<HomeIcon />}
          title="Produtos"
          pageName="Produtos"
        />
        <NavbarLinkItem
          page="/cliente"
          icon={<WalkIcon />}
          title="Clientes"
          pageName="Clientes"
        />
        <NavbarLinkItem
          page="/instrutor"
          icon={<WeightsIcon />}
          title="Instrutores"
          pageName="Instrutores"
        />
      </div>
    );
  }
}

export default Navbar;
