/**
 * Componente que exibe um item de contador
 *
 * @author Stéfany Leal
 */

import React from 'react';
import PropTypes from 'prop-types';
import RegistrarModal from 'components/RegistrarModal';
import './style.scss';

class CountItem extends React.PureComponent {
  render() {
    return (
      <div className="ct_count_item" >
        <div className="count_titulo">{this.props.count}</div>
        <div className="count_descricao">{`Total de ${this.props.label}`}</div>
        <RegistrarModal
          label={this.props.label}
          insertFunction={this.props.insertFunction}
          insertData={this.props.insertData}
          loadFunc={this.props.loadCount}
        />
      </div>
    );
  }
}

CountItem.propTypes = {
  count: PropTypes.number,
  label: PropTypes.string,
  insertFunction: PropTypes.func,
  insertData: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  loadCount: PropTypes.func
};

export default CountItem;
