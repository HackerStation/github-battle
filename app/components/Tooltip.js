import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  container: {
    position: 'relative',
    display: 'flex'
  },
  tooltip: {
    boxSizing: 'border-box',
    position: 'absolute',
    width: '160px',
    bottom: '100%',
    left: '50%',
    marginLeft: '-80px',
    borderRadius: '3px',
    backgroundColor: 'hsla(0, 0%, 20%, 0.9)',
    padding: '7px',
    marginBottom: '5px',
    color: '#fff',
    textAlign: 'center',
    fontSize: '14px'
  }
};

class Tooltip extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hovering: false
    };
  }
  mouseOver = () => {
    this.setState({
      hovering: true
    });
  };
  mouseOut = () => {
    this.setState({
      hovering: false
    });
  };
  render() {
    return (
      <div
        onMouseOver={this.mouseOver}
        onMouseOut={this.mouseOut}
        style={styles.container}
      >
        {this.state.hovering === true && (
          <div style={styles.tooltip}>{this.props.text}</div>
        )}
        {this.props.children}
      </div>
    );
  }
}

export default Tooltip;

Tooltip.propTypes = {
  text: PropTypes.string.isRequired
};
