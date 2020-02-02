import React from 'react';
import PropTypes from 'prop-types';

/**
 * Loading
 * Loading.
 * Loading..
 * Loading...
 * Loading
 */

const styles = {
  content: {
    fontSize: '35px',
    position: 'absolute',
    left: 0,
    right: 0,
    marginTop: '20px',
    textAlign: 'center',
    fontWeight: 'bold'
  }
};

class Loading extends React.Component {
  state = {
    content: this.props.text
  };

  componentDidMount() {
    const { text, speed } = this.props;

    this.interval = setInterval(() => {
      this.state.content === text + '...'
        ? this.setState({
            content: text
          })
        : this.setState(({ content }) => ({
            content: content + '.'
          }));
    }, speed);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <div style={styles.content}>{this.state.content}</div>;
  }
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired
};

Loading.defaultProps = {
  text: 'Loading',
  speed: 300
};

export default Loading;
