import React from 'react';
import Loading from './Loading';
import Card from './Card';
import { battle } from '../utils/api';
import PropTypes from 'prop-types';

import {
  FaUser,
  FaCompass,
  FaBriefcase,
  FaUsers,
  FaUserFriends,
  FaCode
} from 'react-icons/fa';

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

class ProfileList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hoveringLocation: false,
      hoveringCompany: false
    };
  }
  mouseOver = id => {
    this.setState({
      [id]: true
    });
  };
  mouseOut = id => {
    this.setState({
      [id]: false
    });
  };
  render() {
    const { hoveringLocation, hoveringCompany } = this.state;
    const {
      login,
      name,
      location,
      company,
      followers,
      following,
      public_repos
    } = this.props.profile;
    return (
      <ul className='card-list'>
        <li>
          <FaUser color='rgb(239, 115, 115)' size={22} />
          <a href={`https://www.github.com/${login}`}>{name}</a>
        </li>
        {location && (
          <li
            onMouseOver={() => this.mouseOver('hoveringLocation')}
            onMouseOut={() => this.mouseOut('hoveringLocation')}
            style={styles.container}
          >
            {hoveringLocation === true && (
              <div style={styles.tooltip}>User's Location</div>
            )}
            <FaCompass color='rgb(144, 116, 255)' size={22} />
            {location}
          </li>
        )}
        {company && (
          <li
            onMouseOver={() => this.mouseOver('hoveringCompany')}
            onMouseOut={() => this.mouseOut('hoveringCompany')}
            style={styles.container}
          >
            {hoveringCompany === true && (
              <div style={styles.tooltip}>User's Company</div>
            )}
            <FaBriefcase color='#795548' size={22} />
            {company}
          </li>
        )}
        <li>
          <FaUsers color='rgb(129, 195, 245)' size={22} />
          {followers.toLocaleString()} followers
        </li>
        <li>
          <FaUserFriends color='rgb(64, 183, 95)' size={22} />
          {following.toLocaleString()} following
        </li>
        <li>
          <FaCode color='rgb(239, 174, 180)' size={22} />
          {public_repos} repositories
        </li>
      </ul>
    );
  }
}

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: null,
      isLoading: true
    };
  }

  componentDidMount() {
    const { playerOne, playerTwo } = this.props;

    battle([playerOne, playerTwo])
      .then(results => {
        this.setState({
          winner: results[0],
          loser: results[1],
          isLoading: false,
          error: null
        });
      })
      .catch(({ message }) => {
        this.setState({
          error: message,
          isLoading: false
        });
      });
  }

  render() {
    const { winner, loser, isLoading, error } = this.state;
    if (isLoading) {
      return <Loading />;
    }

    if (error) {
      <p className='center-text error'>{error}</p>;
    }

    return (
      <React.Fragment>
        <div className='grid space-around container-sm'>
          <Card
            header={winner.score === loser.score ? 'Tie' : 'Winner'}
            subheader={`Score: ${winner.score.toLocaleString()}`}
            avatar={winner.profile.avatar_url}
            href={winner.profile.html_url}
            name={winner.profile.login}
          >
            <ProfileList profile={winner.profile} />
          </Card>
          <Card
            header={winner.score === loser.score ? 'Tie' : 'Loser'}
            subheader={`Score: ${loser.score.toLocaleString()}`}
            avatar={loser.profile.avatar_url}
            href={loser.profile.html_url}
            name={loser.profile.login}
          >
            <ProfileList profile={loser.profile} />
          </Card>
        </div>
        <button className='btn dark-btn btn-space' onClick={this.props.onReset}>
          Reset
        </button>
      </React.Fragment>
    );
  }
}

Results.propTypes = {
  playerOne: PropTypes.string.isRequired,
  playerTwo: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired
};

export default Results;
