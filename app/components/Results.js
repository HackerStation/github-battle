import React from 'react';
import { battle } from '../utils/api';
import {
  FaUser,
  FaCompass,
  FaBriefcase,
  FaUsers,
  FaUserFriends,
  FaCode
} from 'react-icons/fa';

const Card = props => {
  const { label, score } = props;
  const {
    login,
    avatar_url,
    name,
    html_url,
    location,
    company,
    followers,
    following,
    public_repos
  } = props.profile;
  return (
    <div key={html_url} className='card bg-light'>
      <h4 className='header-lg center-text'>{label}</h4>
      <img src={avatar_url} className='avatar' alt={`Avatar for ${login}`} />
      <h4 className='center-text'>{score.toLocaleString()}</h4>
      <h2 className='center-text'>
        <a href={html_url} className='link'>
          {login}
        </a>
      </h2>
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
    </div>
  );
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
      return <div>LOADING...</div>;
    }

    if (error) {
      <p className='center-text error'>{error}</p>;
    }

    return (
      <div className='grid space-around container-sm'>
        <Card
          label={winner.score === loser.score ? 'Tie' : 'Winner'}
          score={winner.score}
          profile={winner.profile}
        />
        <Card
          label={winner.score === loser.score ? 'Tie' : 'Loser'}
          score={loser.score}
          profile={loser.profile}
        />
      </div>
    );
  }
}

export default Results;
