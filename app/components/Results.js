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

const ProfileList = ({ profile }) => {
  const {
    login,
    name,
    location,
    company,
    followers,
    following,
    public_repos
  } = profile;
  return (
    <ul className='card-list'>
      <li>
        <FaUser color='rgb(239, 115, 115)' size={22} />
        <a href={`https://www.github.com/${login}`}>{name}</a>
      </li>
      {location && (
        <li>
          <FaCompass color='rgb(144, 116, 255)' size={22} />
          {location}
        </li>
      )}
      {company && (
        <li>
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
};

ProfileList.propTypes = {
  profile: PropTypes.object.isRequired
};

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
