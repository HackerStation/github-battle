import React from 'react';
import { FaUserFriends, FaFighterJet, FaTrophy } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Instructions = () => {
  return (
    <div className='instructions-container'>
      <h1 className='center-text header-lg'>Instructions</h1>
      <ul className='container-sm grid center-text battle-instructions'>
        <li>
          <h4 className='header-sm'>Enter two Github Users</h4>
          <FaUserFriends
            className='bg-light'
            color='rgb(255, 191, 116'
            size={140}
          />
        </li>
        <li>
          <h4 className='header-sm'>Battle</h4>
          <FaFighterJet className='bg-light' color='#727272' size={140} />
        </li>
        <li>
          <h4 className='header-sm'>See the winner</h4>
          <FaTrophy className='bg-light' color='rgb(255, 215, 0)' size={140} />
        </li>
      </ul>
    </div>
  );
};

class PlayerInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ''
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.username);
  };

  handleChange = e => {
    this.setState({
      username: e.target.value
    });
  };

  render() {
    return (
      <form className='column player' onSubmit={this.handleSubmit}>
        <label htmlFor='username' className='player-label'>
          {this.props.label}
        </label>
        <div className='row player-inputs'>
          <input
            type='text'
            name='username'
            className='input-light'
            placeholder='GitHub Username'
            autoComplete='off'
            onChange={this.handleChange}
            value={this.state.username}
          />
          <button
            className='btn dark-btn'
            type='submit'
            disabled={!this.state.username}
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}

PlayerInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};

class Battle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userDetails: null
    };
  }

  getUserDetails = username => {
    console.log(username);
  };

  render() {
    return (
      <React.Fragment>
        <Instructions />
      </React.Fragment>
    );
  }
}

export default Battle;
