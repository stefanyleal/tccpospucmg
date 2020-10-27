/**
 * Página que renderiza as informações exibidas na ClientePage
 *
 * @author Stéfany Leal
 */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import toastr from 'toastr';
import { DeleteIcon } from 'mdi-react';
import LoadingIndicator from 'components/LoadingIndicator';
import RegistrarModal from 'components/RegistrarModal';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './style.scss';

export default class ClientePage extends React.PureComponent {
  componentDidMount() {
    this.props.loadCliente();
  }

  componentDidUpdate() {
    if (this.deleteClienteClicked && !this.props.deleteCliente.loading) {
      this.deleteClienteClicked = false;

      if (this.props.deleteCliente.error) {
        toastr.error('Ocorreu um erro ao tentar realizar a exclusão', 'Exclusão não realizada', {
          timeOut: 5000,
          closeDuration: 500,
          closeButton: true,
          progressBar: true
        });
      } else if (this.props.deleteCliente.data) {
        toastr.success('A exclusão foi realizada com sucesso.', 'Exclusão realizada', {
          timeOut: 5000,
          closeDuration: 500,
          closeButton: true,
          progressBar: true
        });
        this.props.loadCliente();
      }
    }
  }

  render() {
    const columns = [{
      Header: 'Nome',
      accessor: 'pessoa.nome'
    }, {
      Header: 'Identidade',
      accessor: 'pessoa.identidade'
    }, {
      Header: 'CPF',
      accessor: 'pessoa.cpf'
    }, {
      Header: 'Endereço',
      accessor: 'pessoa.endereco'
    }, {
      Header: 'Plano',
      accessor: 'plano'
    }, {
      id: 'dtpagamento',
      Header: 'Pagamento',
      accessor: (cliente) => moment(cliente.pagamento.substr(0, 10)).format('DD/MM/YYYY'),
    }, {
      Header: 'Situação',
      accessor: 'pagamento',
      Cell: (props) => (
        <div className={props.value < moment().format() ? 'inadimplente' : 'adimplente'}>
          {props.value < moment().format() ? 'inadimplente' : 'adimplente'}
        </div>
      )
    }, {
      id: 'acoes',
      Header: 'Ações',
      accessor: (cliente) => cliente,
      Cell: (props) => (
        <div className="ct_acoes">
          <RegistrarModal
            label={'Clientes'}
            insertFunction={(cliente) => {
              cliente.id = props.value.id;
              this.props.editClienteFunc(cliente);
            }}
            insertData={this.props.editCliente}
            loadFunc={this.props.loadCliente}
            data={props.value}
          />
          <DeleteIcon
            className="icon"
            onClick={() => {
              this.deleteClienteClicked = true;
              this.props.deleteClienteFunc(props.value.id);
            }}
          />
        </div>
      )
    }];

    return (
      <article className="app_page" >
        <section>
          <div className="ct_table_title">Clientes</div>
        </section>
        <section>
          {this.props.cliente.data && !this.props.cliente.loading ?
            <ReactTable
              columns={columns}
              data={this.props.cliente.data}
              showPagination={false}
              minRows={0}
            />
            : <LoadingIndicator />
          }
        </section>
      </article>
    );
  }
}

ClientePage.propTypes = {
  loadCliente: PropTypes.func,
  cliente: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  deleteClienteFunc: PropTypes.func,
  deleteCliente: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  editClienteFunc: PropTypes.func,
  editCliente: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ])
};
