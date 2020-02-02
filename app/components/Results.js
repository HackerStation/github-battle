import React from 'react';
import Loading from './Loading';
import Card from './Card';
import Tooltip from './Tooltip';
import Hover from './Hover';
import { battle } from '../utils/api';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import {
  FaUser,
  FaCompass,
  FaBriefcase,
  FaUsers,
  FaUserFriends,
  FaCode
} from 'react-icons/fa';

const ProfileList = props => {
  const {
    login,
    name,
    location,
    company,
    followers,
    following,
    public_repos
  } = props.profile;
  return (
    <ul className='card-list'>
      <li>
        <FaUser color='rgb(239, 115, 115)' size={22} />
        <a href={`https://www.github.com/${login}`}>{name}</a>
      </li>
      {location && (
        <li>
          <Hover>
            {hovering => (
              <Tooltip text="User's Location" hovering={hovering}>
                <FaCompass color='rgb(144, 116, 255)' size={22} />
                {location}
              </Tooltip>
            )}
          </Hover>
        </li>
      )}
      {company && (
        <li>
          <Hover>
            {hovering => (
              <Tooltip text="User's Company" hovering={hovering}>
                <FaBriefcase color='#795548' size={22} />
                {company}
              </Tooltip>
            )}
          </Hover>
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
    const { playerOne, playerTwo } = queryString.parse(
      this.props.location.search
    );

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
        <Link to='/battle' className='btn dark-btn btn-space'>
          Reset
        </Link>
      </React.Fragment>
    );
  }
}

export default Results;
