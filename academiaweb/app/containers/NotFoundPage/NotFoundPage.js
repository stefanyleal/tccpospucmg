/**
 * Página que renderiza as informações exibidas na NotFoundPage
 *
 * @author Stéfany Leal
 */

import React from 'react';
import { Link } from 'react-router-dom';

import NotFoundImage from './images/notfound.png';
import Logo from '../../images/logo.png';
import './style.scss';

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="ct_notfound">
        <div className="not_found">
          <img src={Logo} alt="Logo TCC" className="notfound_logo" />

          <img src={NotFoundImage} alt="Imagem de página não encontrada" className="notfound_image" />

          <div className="notfound_message">
            Você tem certeza que tentou entrar no lugar certo?
            <br />
            <span className="message_bold">Não encontramos nada :(</span>
          </div>

          <Link className="back_to_home" to="/home">Voltar para a Página Inicial</Link>
        </div>
      </div>
    </div>
  );
}
