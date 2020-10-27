/**
 * Página que renderiza as informações exibidas na HomePage
 *
 * @author Stéfany Leal
 */

import React from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from 'components/LoadingIndicator';
import CountItem from 'components/CountItem';
import './style.scss';

export default class HomePage extends React.PureComponent {
  componentDidMount() {
    this.props.loadCountCliente();
    this.props.loadCountInstrutor();
  }

  render() {
    return (
      <article className="app_page" >
        <section>
          <div className="ct_table_title">Página inicial</div>
        </section>
        <section>
          <div className="ct_counts">

            {this.props.countCliente && this.props.countCliente.data >= 0 && !this.props.countCliente.loading ?
              <CountItem
                count={this.props.countCliente.data}
                label={'Clientes'}
                key={'countCliente'}
                insertFunction={this.props.insertClienteFunc}
                insertData={this.props.insertCliente}
                loadCount={this.props.loadCountCliente}
              />
              : <LoadingIndicator />
            }

            {this.props.countInstrutor && this.props.countInstrutor.data >= 0 && !this.props.countInstrutor.loading ?
              <CountItem
                count={this.props.countInstrutor.data}
                label={'Instrutores'}
                key={'countInstrutor'}
                insertFunction={this.props.insertInstrutorFunc}
                insertData={this.props.insertInstrutor}
                loadCount={this.props.loadCountInstrutor}
              />
              : <LoadingIndicator />
            }

          </div>
        </section>
      </article>
    );
  }
}

HomePage.propTypes = {
  loadCountCliente: PropTypes.func,
  loadCountInstrutor: PropTypes.func,
  countCliente: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  countInstrutor: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  insertClienteFunc: PropTypes.func,
  insertInstrutorFunc: PropTypes.func,
  insertCliente: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  insertInstrutor: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
};
