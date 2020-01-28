import React from 'react';
import { FaUserFriends, FaFighterJet, FaTrophy } from 'react-icons/fa';

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

class Battle extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Instructions />
      </React.Fragment>
    );
  }
}

export default Battle;
