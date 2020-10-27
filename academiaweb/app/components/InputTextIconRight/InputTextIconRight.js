/**
 * Componente que renderiza um campo de texto
 *
 * @author Stéfany Leal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { CloseIcon } from 'mdi-react';
import './style.scss';

class InputTextIconRigth extends React.PureComponent {
  clearInput = () => {
    this.props.onChange({ target: { value: '' } });
    this.inputField.focus();
    this.clearClicked = true;
  }

  iconClick = () => {
    if (this.props.onIconClick) {
      this.props.onIconClick();
    }
    this.inputField.focus();
  }

  render() {
    if (this.clearClicked && this.props.onInputKeyPress) {
      this.clearClicked = false;
      this.props.onInputKeyPress({ key: 'ENTER' });
    }
    return (
      <div className={this.props.inputError ? 'ct_input input_error' : 'ct_input'} >
        <input
          ref={(r) => { this.inputField = r; }}
          className={this.props.activeReadOnly ? 'input_text_icon_right input_text_readonly' : 'input_text_icon_right'}
          name={this.props.name}
          type={this.props.type}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this.props.onChange}
          onClick={this.props.onClick}
          onFocus={this.props.onInputFocus}
          onKeyPress={this.props.onInputKeyPress}
          readOnly={this.props.activeReadOnly ? 'readOnly' : ''}
        />
        <div
          className="ct_icon"
          onClick={!this.props.activeReadOnly && this.props.value !== '' ? this.clearInput : this.iconClick}
          onKeyPress={() => {}}
          role="button"
          tabIndex="-1"
        >
          {!this.props.activeReadOnly && this.props.value !== '' ?
            <CloseIcon /> : this.props.icon}
        </div>
      </div>
    );
  }
}

InputTextIconRigth.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.object,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  activeReadOnly: PropTypes.bool,
  inputError: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  onIconClick: PropTypes.func,
  onInputFocus: PropTypes.func,
  onInputKeyPress: PropTypes.func
};

export default InputTextIconRigth;
