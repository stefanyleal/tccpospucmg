/**
 * Componente que recebe um componente e o renderiza com um tooltip
 *
 * @author Stéfany Leal
 */

import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';
import './style.scss';
import './style-animation.scss';

class GenericTooltip extends React.PureComponent {
  render() {
    return (
      this.props.tooltipVisible || this.props.tooltipVisible === false ?
        <Tooltip
          placement={this.props.position}
          overlay={this.props.tooltip}
          mouseEnterDelay={0.5}
          mouseLeaveDelay={0}
          visible={this.props.tooltipVisible}
          transitionName={'rc-tooltip-zoom'}
        >
          {this.props.container}
        </Tooltip>
        :
        <Tooltip
          placement={this.props.position}
          overlay={this.props.tooltip}
          mouseEnterDelay={0.5}
          mouseLeaveDelay={0}
          transitionName={'rc-tooltip-zoom'}
        >
          {this.props.container}
        </Tooltip>
    );
  }
}

GenericTooltip.propTypes = {
  container: PropTypes.any,
  tooltip: PropTypes.any,
  position: PropTypes.string,
  tooltipVisible: PropTypes.bool
};

export default GenericTooltip;
