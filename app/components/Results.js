import React from 'react';
import { battle } from '../utils/api';

class Results extends React.Component {
  componentDidMount() {
    const { playerOne, playerTwo } = this.props;

    battle([playerOne, playerTwo]).then(results => {
      console.log(results);
    });
  }

  render() {
    return (
      <div>
        RESULTS...
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
      </div>
    );
  }
}

export default Results;
