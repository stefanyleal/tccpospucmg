/**
 * Página que renderiza as informações exibidas na InstrutorPage
 *
 * @author Stéfany Leal
 */

import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { DeleteIcon } from 'mdi-react';
import LoadingIndicator from 'components/LoadingIndicator';
import RegistrarModal from 'components/RegistrarModal';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './style.scss';

export default class InstrutorPage extends React.PureComponent {
  componentDidMount() {
    this.props.loadInstrutor();
  }

  componentDidUpdate() {
    if (this.deleteInstrutorClicked && !this.props.deleteInstrutor.loading) {
      this.deleteInstrutorClicked = false;

      if (this.props.deleteInstrutor.error) {
        toastr.error('Ocorreu um erro ao tentar realizar a exclusão', 'Exclusão não realizada', {
          timeOut: 5000,
          closeDuration: 500,
          closeButton: true,
          progressBar: true
        });
      } else if (this.props.deleteInstrutor.data) {
        toastr.success('A exclusão foi realizada com sucesso.', 'Exclusão realizada', {
          timeOut: 5000,
          closeDuration: 500,
          closeButton: true,
          progressBar: true
        });
        this.props.loadInstrutor();
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
      Header: 'Musculação',
      accessor: 'musculacao',
      Cell: (props) => (
        <div className={props.value ? 'verdadeiro' : 'falso'}>
          {props.value ? 'Sim' : 'Não'}
        </div>
      )
    }, {
      Header: 'Aula em grupo',
      accessor: 'aulagrupo',
      Cell: (props) => (
        <div className={props.value ? 'verdadeiro' : 'falso'}>
          {props.value ? 'Sim' : 'Não'}
        </div>
      )
    }, {
      Header: 'Aula',
      accessor: 'aula.nome'
    }, {
      Header: 'Horário',
      accessor: 'aula.horario'
    }, {
      id: 'acoes',
      Header: 'Ações',
      accessor: (instrutor) => instrutor,
      Cell: (props) => (
        <div className="ct_acoes">
          <RegistrarModal
            label={'Instrutores'}
            insertFunction={(instrutor) => {
              instrutor.id = props.value.id;
              this.props.editInstrutorFunc(instrutor);
            }}
            insertData={this.props.editInstrutor}
            loadFunc={this.props.loadInstrutor}
            data={props.value}
          />
          <DeleteIcon
            className="icon"
            onClick={() => {
              this.deleteInstrutorClicked = true;
              this.props.deleteInstrutorFunc(props.value.id);
            }}
          />
        </div>
      )
    }];

    return (
      <article className="app_page" >
        <section>
          <div className="ct_table_title">Instrutores</div>
        </section>
        <section>
          {this.props.instrutor.data && !this.props.instrutor.loading ?
            <ReactTable
              columns={columns}
              data={this.props.instrutor.data}
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

InstrutorPage.propTypes = {
  loadInstrutor: PropTypes.func,
  instrutor: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  deleteInstrutorFunc: PropTypes.func,
  deleteInstrutor: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  editInstrutorFunc: PropTypes.func,
  editInstrutor: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ])
};
