/**
 * Página App da estrutura do sistema, onde os outras páginas são chamadas e exibidas
 *
 * @author Stéfany Leal
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Switch, Route, Redirect } from 'react-router-dom';

import toastr from 'toastr';
import 'toastr/build/toastr.css';

import LoginPage from 'containers/LoginPage/Loadable';
import HomePage from 'containers/HomePage';
import ClientePage from 'containers/ClientePage';
import InstrutorPage from 'containers/InstrutorPage';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Navbar from 'components/Navbar';

import './style.scss';

export default class App extends React.PureComponent {
  componentDidMount() {
    if (!this.props.currentUser && window.localStorage.getItem('pucmg_tcc_access_token')) {
      this.skipLogin = true;
      this.props.loginUser();
    }
    window.scrollTo(0, 0);
    this.logged = false;
    this.mounted = true;
  }

  componentDidUpdate() {
    if (this.props.loginError) {
      this.props.logoutUser();
    }

    if (this.props.error) {
      toastr.error(this.props.error.message, this.props.error.title, {
        timeOut: 5000,
        closeDuration: 500,
        closeButton: true,
        progressBar: true
      });
    }
  }

  /**
   * Método que realiza o logout dos usuários
   *
   * @author Stéfany Leal
   */
  logout = () => {
    this.skipLogin = false;
    this.logged = false;
    this.props.history.push('/home');
    this.props.logoutUser();
  }

  render() {
    if (this.mounted && !this.logged && this.props.currentUser && !this.props.loginError) {
      this.logged = true;
    }

    return (
      <div className="app-wrapper">
        <Helmet
          titleTemplate="%s - Academia Fit Girl - PUC MG"
          defaultTitle="Academia Fit Girl - PUC MG"
        >
          <meta name="description" content="Academia feminina Fit Girl" />
        </Helmet>

        {!this.props.currentUser && !window.localStorage.getItem('pucmg_tcc_access_token') ?
          <LoginPage />
          :
          <div>
            <Header currentUser={this.props.currentUser} logoutUser={this.logout} />
            <div className="ct_app">
              <Navbar />
              <Switch>
                <Redirect exact from="/" to="/home" />
                <Route exact path="/home" component={HomePage} />
                <Route exact path="/cliente" component={ClientePage} />
                <Route exact path="/instrutor" component={InstrutorPage} />
                <Route path="" component={NotFoundPage} />
              </Switch>
            </div>
          </div>
        }
      </div>
    );
  }
}

App.propTypes = {
  currentUser: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  loginUser: PropTypes.func,
  logoutUser: PropTypes.func,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  loginError: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  history: PropTypes.object,
};
