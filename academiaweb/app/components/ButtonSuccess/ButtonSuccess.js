import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

class ButtonSuccess extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <button
        className={`button_success ${this.props.className}`}
        name={this.props.name}
        type={this.props.type}
        onClick={this.props.onClick}
      >
        <span className="button_text">{this.props.text}</span>
      </button>
    );
  }
}

ButtonSuccess.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default ButtonSuccess;
