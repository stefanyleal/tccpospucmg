/**
 * Componente que renderiza o modal de cadastro e atualização
 *
 * @author Stéfany Leal
 */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Modal from 'react-responsive-modal';
import toastr from 'toastr';
import LoadingIndicator from 'components/LoadingIndicator';
import InputTextIconRight from 'components/InputTextIconRight';
import ButtonSuccess from 'components/ButtonSuccess';
import { ClipboardTextIcon, EditIcon } from 'mdi-react';
import './style.scss';

class RegistrarModal extends React.Component {
  constructor(props) {
    super(props);

    this.initialState = {
      openModal: false,
      nome: props.data && props.data.pessoa ? props.data.pessoa.nome : undefined,
      identidade: props.data && props.data.pessoa ? props.data.pessoa.identidade : undefined,
      cpf: props.data && props.data.pessoa ? props.data.pessoa.cpf : undefined,
      endereco: props.data && props.data.pessoa ? props.data.pessoa.endereco : undefined,
      plano: props.data ? props.data.plano : undefined,
      pagamento: props.data && props.data.pagamento ? moment(props.data.pagamento.substr(0, 10)).format('YYYY-MM-DD') : undefined,
      musculacao: props.data ? props.data.musculacao : false,
      aulagrupo: props.data ? props.data.aulagrupo : false,
      aula: props.data && props.data.aula ? props.data.aula.nome : undefined,
      horario: props.data && props.data.aula ? props.data.aula.horario : undefined
    };

    this.state = this.initialState;
  }

  componentDidUpdate() {
    if (this.realizarPedidoClicked && !this.props.insertData.loading) {
      this.realizarPedidoClicked = false;

      if (this.props.insertData.error) {
        const titulo = this.props.data ? 'Atualização não realizada' : 'Cadastro não realizado';
        const descricao = this.props.data ? 'Ocorreu um erro ao tentar realizar a atualização'
          : 'Ocorreu um erro ao tentar realizar o cadastro';

        toastr.error(descricao, titulo, {
          timeOut: 5000,
          closeDuration: 500,
          closeButton: true,
          progressBar: true
        });
      } else if (this.props.insertData.data) {
        const titulo = this.props.data ? 'Atualização realizada' : 'Cadastro realizado';
        const descricao = this.props.data ? 'A atualização foi realizada com sucesso.'
          : 'O cadastro foi realizado com sucesso.';

        toastr.success(descricao, titulo, {
          timeOut: 5000,
          closeDuration: 500,
          closeButton: true,
          progressBar: true
        });
        this.props.loadFunc();
        this.closeModal();
      }
    }
  }

  /**
   * Método responsável por abrir o modal
   *
   * @author Stéfany Leal
   */
  openModal = () => {
    this.setState({ openModal: true });
  }

  /**
   * Método responsável por fechar o modal
   *
   * @author Stéfany Leal
   */
  closeModal = () => {
    this.setState(this.initialState);
  }

  enviarForm = () => {
    const pessoa = {
      nome: this.state.nome,
      identidade: this.state.identidade,
      cpf: this.state.cpf
    };

    if (this.props.label === 'Clientes') {
      pessoa.endereco = this.state.endereco;
      const cliente = {
        pessoa,
        plano: this.state.plano,
        pagamento: moment(this.state.pagamento, 'YYYY-MM-DD'),
      };

      this.props.insertFunction(cliente);
    }

    if (this.props.label === 'Instrutores') {
      const aula = {
        nome: this.state.aula,
        horario: this.state.horario
      };
      const instrutor = {
        pessoa,
        musculacao: this.state.musculacao,
        aulagrupo: this.state.aulagrupo,
        aula
      };

      this.props.insertFunction(instrutor);
    }

    this.realizarPedidoClicked = true;
  }

  cancelarForm = () => {
    if (this.state.formFinal) {
      this.setState({ formFinal: false });
    } else {
      this.closeModal();
    }
  }

  renderInputsRegistrar = () => (
    <div>
      <div className="ct_modal_input" >
        <InputTextIconRight
          name="input_nome"
          type="text"
          placeholder="Nome"
          icon={<ClipboardTextIcon />}
          value={this.state.nome !== undefined ? this.state.nome : ''}
          onChange={(evt) => this.setState({ nome: evt.target.value })}
        />
      </div>
      <br />
      <div className="ct_modal_input" >
        <InputTextIconRight
          name="input_identidade"
          type="text"
          placeholder="Identidade"
          icon={<ClipboardTextIcon />}
          value={this.state.identidade !== undefined ? this.state.identidade : ''}
          onChange={(evt) => this.setState({ identidade: evt.target.value })}
        />
      </div>
      <br />
      <div className="ct_modal_input" >
        <InputTextIconRight
          name="input_cpf"
          type="text"
          placeholder="CPF"
          icon={<ClipboardTextIcon />}
          value={this.state.cpf !== undefined ? this.state.cpf : ''}
          onChange={(evt) => this.setState({ cpf: evt.target.value })}
        />
      </div>
      {this.props.label === 'Clientes' ?
        <div>
          <br />
          <div className="ct_modal_input" >
            <InputTextIconRight
              name="input_endereco"
              type="text"
              placeholder="Endereço"
              icon={<ClipboardTextIcon />}
              value={this.state.endereco !== undefined ? this.state.endereco : ''}
              onChange={(evt) => this.setState({ endereco: evt.target.value })}
            />
          </div>
          <br />
          <div>Plano:</div>
          <div className="ct_modal_input" >
            <div>
              <input
                name="input_anual"
                type="radio"
                value="Anual"
                checked={this.state.plano === 'Anual'}
                onChange={(evt) => this.setState({ plano: evt.target.value })}
              />
              <span>Anual</span>
            </div>
            <div>
              <input
                name="input_mensal"
                type="radio"
                value="Mensal"
                checked={this.state.plano === 'Mensal'}
                onChange={(evt) => this.setState({ plano: evt.target.value })}
              />
              <span>Mensal</span>
            </div>
          </div>
          <br />
          <div className="ct_modal_input ct_input_date" >
            <div>Pagamento:</div>
            <input
              name="input_pagamento"
              type="date"
              className="input_date"
              placeholder="Data de pagamento (DD/MM/YYYY)"
              icon={<ClipboardTextIcon />}
              value={this.state.pagamento !== undefined ? this.state.pagamento : ''}
              onChange={(evt) => this.setState({ pagamento: evt.target.value })}
            />
          </div>
        </div>
        : null}
      {this.props.label === 'Instrutores' ?
        <div>
          <br />
          <div className="ct_modal_input" >
            <div>
              <input
                name="input_musculacao"
                type="checkbox"
                checked={this.state.musculacao}
                onChange={(evt) => this.setState({ musculacao: evt.target.checked })}
              />
              <span>Musculação</span>
            </div>
            <div>
              <input
                name="input_aulagrupo"
                type="checkbox"
                checked={this.state.aulagrupo}
                onChange={(evt) => this.setState({ aulagrupo: evt.target.checked })}
              />
              <span>Aula em grupo</span>
            </div>
          </div>
        </div>
        : null}
      {this.state.aulagrupo ?
        <div>
          <br />
          <div className="ct_modal_input" >
            <InputTextIconRight
              name="input_aula"
              type="text"
              placeholder="Nome da aula"
              icon={<ClipboardTextIcon />}
              value={this.state.aula !== undefined ? this.state.aula : ''}
              onChange={(evt) => this.setState({ aula: evt.target.value })}
            />
          </div>
          <br />
          <div className="ct_modal_input" >
            <InputTextIconRight
              name="input_horario"
              type="text"
              placeholder="Horário da aula"
              icon={<ClipboardTextIcon />}
              value={this.state.horario !== undefined ? this.state.horario : ''}
              onChange={(evt) => this.setState({ horario: evt.target.value })}
            />
          </div>
        </div>
        : null}
    </div>
  )

  render() {
    return (
      <div className="ct_registrar_modal">
        {this.props.data ?
          <EditIcon
            className="icon"
            onClick={() => this.openModal()}
          />
          :
          <ButtonSuccess
            className="registrar_botao"
            text={'Cadastrar'}
            onClick={() => this.openModal()}
          />
        }
        <Modal
          open={this.state.openModal}
          onClose={() => this.closeModal()}
          center
          closeOnEsc
          classNames={{ modal: 'registrar_modal' }}
        >
          <div className="modal_title">
            {`${this.props.data ? 'Atualizar' : 'Cadastrar'} ${this.props.label}`}
          </div>
          <hr className="modal_divisor" />
          {this.props.insertData && this.props.insertData.loading ?
            <div className="modal_container centered">
              <LoadingIndicator />
            </div>
            :
            <div className="modal_container">
              {this.renderInputsRegistrar()}
            </div>
          }
          <hr className="modal_divisor" />
          <div className="modal_buttons">
            <button className="cancel_button" onClick={() => this.cancelarForm()}>
              Cancelar
            </button>
            {this.props.insertData && this.props.insertData.loading ?
              <button className="send_button disabled" onClick={() => null}>
                {this.props.data ? 'Atualizar' : 'Cadastrar'}
              </button>
              :
              <button className="send_button" onClick={() => this.enviarForm()}>
                {this.props.data ? 'Atualizar' : 'Cadastrar'}
              </button>
            }
          </div>
        </Modal>
      </div>
    );
  }
}

RegistrarModal.propTypes = {
  label: PropTypes.string,
  data: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  insertFunction: PropTypes.func,
  insertData: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  loadFunc: PropTypes.func
};

export default RegistrarModal;
